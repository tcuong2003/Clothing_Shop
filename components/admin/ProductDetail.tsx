import { Star, X } from "lucide-react";
import { calculateAverageRating } from "../ProductDetail/utils/productHelpers";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Product } from "@/types/product.type";
import productService from "@/services/productService";
import Spin from "./Spin";

interface ProductDetailProps {
  id: string | number;
  onShowModal: (show: boolean) => void;
}

export default function ProductDetail({ id, onShowModal }: ProductDetailProps) {
  const [record, setRecord] = useState<Product>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        setLoading(true);
        const data = await productService.getById(id);
        if (data) {
          setRecord(data);
        }
      } catch (error) {
        console.error("Error fetching productItem:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchApi();
  }, [id]);

  const handleClose = () => {
    onShowModal(false);
  };

  return (
    <>
      <div className="modal-overlay" onClick={handleClose}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Chi tiết sản phẩm</h2>
            <button className="btn-close" onClick={() => onShowModal(false)}>
              <X size={24} />
            </button>
          </div>

          {loading ? (
            <div style={{ padding: "40px" }}>
              <Spin tip="Đang tải dữ liệu..." />
            </div>
          ) : (
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group full-width">
                  <label htmlFor="title">Tên sản phẩm</label>
                  <input type="text" disabled value={record?.title || ""} />
                </div>

                <div className="form-group full-width">
                  <label htmlFor="rating">Đánh giá</label>
                  <div className="rating">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5  ${
                          i <
                          Math.floor(
                            calculateAverageRating(record?.reviews ?? [])
                          )
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-muted text-muted"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {record?.thumbnail && (
                  <div className="form-group full-width">
                    <label htmlFor="">Hình ảnh</label>
                    <div className="image-box">
                      <Image
                        fill
                        src={record?.thumbnail}
                        alt={record?.title || ""}
                      />
                    </div>
                  </div>
                )}

                <div className="form-group full-width">
                  <label htmlFor="description">Mô tả</label>
                  <textarea
                    name="description"
                    id="description"
                    rows={5}
                    cols={1}
                    value={record?.description ?? ""}
                    readOnly
                  ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="description">Danh mục</label>
                  <input type="text" disabled value={record?.category || ""} />
                </div>

                <div className="form-group">
                  <label htmlFor="price">Giá</label>
                  <input type="text" disabled value={record?.price || 0} />
                </div>

                <div className="form-group">
                  <label htmlFor="discountPercentage">Giảm giá</label>
                  <input
                    type="text"
                    disabled
                    value={record?.discountPercentage || 0}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="stock">Số lượng</label>
                  <input type="text" disabled value={record?.stock} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
