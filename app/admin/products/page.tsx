"use client";
export const dynamic = "force-dynamic";
import Pagination from "@/components/admin/Pagination";
import ProductDetail from "@/components/admin/ProductDetail";
import ProductModalAE from "@/components/admin/ProductModalAE";
import Spin from "@/components/admin/Spin";
import { useURLParams } from "@/hooks/useURLParams";
import productService from "@/services/productService";
import { Product } from "@/types/product.type";
import Swal from 'sweetalert2';
import { Edit2, Eye, Plus, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
const ITEMS_PER_PAGE = 10;

type ModalModeType = "add" | "edit";

export default function ProductPage() {
  const { params, updatePage, updateSearch, updateSort, getCurrentSortValue } =
    useURLParams(ITEMS_PER_PAGE);

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState(0);
  const [searchValue, setSearchValue] = useState(params.q || "");
  const [productId, setProductId] = useState<string | number>("");
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<ModalModeType>("add");
  const [showModalAE, setShowModalAE] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [params.limit, params.skip, params.q, params.sortBy, params.order]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getAll(params);

      if (data?.products) {
        setTotalItems(data.total);
        setProducts(data.products);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchValue !== params.q) {
        updateSearch(searchValue);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchValue]);

  const handlePageChange = (page: number) => {
    updatePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShowDetail = (id: any) => {
    setProductId(id);
    setShowModal(true);
  };

  const handleAdd = () => {
    setModalMode("add");
    setProductId("");
    setShowModalAE(true);
  };

  const handleEdit = (id: any) => {
    setModalMode("edit");
    setProductId(id);
    setShowModalAE(true);
  };

  const handleModalSuccess = () => {
    fetchProducts();
  };

  const handleDelete = async (id: any) => {
    const result = await Swal.fire({
      title: "Xác nhận xóa",
      text: "Bạn có chắc chắn muốn xóa sản phẩm này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    });

    if (result.isConfirmed) {
      const loadingToast = toast.loading("Đang xóa sản phẩm...");

      try {
        setLoading(true);
        const deleteResult = await productService.delete(id);

        if (deleteResult && deleteResult.isDeleted) {
          setProducts((products) =>
            products.filter((item) => item.id !== deleteResult.id)
          );
          toast.success("Xóa sản phẩm thành công!", { id: loadingToast });
        }
      } catch (error) {
        console.error("Error delete product:", error);
        toast.error("Có lỗi xảy ra khi xóa sản phẩm!", { id: loadingToast });
      } finally {
        setLoading(false);
      }
    }
  };

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  return (
    <>
      <div className="p-4">
        <div className="container-page">
          <div className="header-page">
            <div className="page-toolbar">
              <div className="search-box">
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Tìm kiếm..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
              <div className="select-box">
                <select
                  name="sort_by"
                  id="sort_by"
                  value={getCurrentSortValue()}
                  onChange={(e) => updateSort(e.target.value)}
                >
                  <option value="">--Sắp xếp--</option>
                  <option value="title_asc">Tên (A-Z)</option>
                  <option value="title_desc">Tên (Z-A)</option>
                  <option value="price_asc">Giá (Thấp - Cao)</option>
                  <option value="price_desc">Giá (Cao - Thấp)</option>
                </select>
              </div>
            </div>
            <div className="header-actions">
              <button className="btn btn-primary" onClick={handleAdd}>
                <Plus size={18} />
                <span>Nhập Hàng</span>
              </button>
            </div>
          </div>
          {loading ? (
            <Spin />
          ) : (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Tên sản phẩm</th>
                    <th>Mô tả</th>
                    <th>Danh mục</th>
                    <th>Giá</th>
                    <th>Số lượng</th>
                    <th>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {products &&
                    products.map((item, index) => (
                      <tr key={item.id}>
                        <td>{(params.skip || 0) + index + 1}</td>
                        <td>{item.title}</td>
                        <td>
                          <div className="text-truncate-multiline">
                            {item.description}
                          </div>
                        </td>
                        <td>{item.category}</td>
                        <td className="price">{item.price}</td>
                        <td>{item.stock}</td>
                        <td className="actions">
                          <button
                            className="btn-icon btn-detail"
                            onClick={() => handleShowDetail(item.id)}
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            className="btn-icon btn-edit"
                            onClick={() => handleEdit(item.id)}
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            className="btn-icon btn-delete"
                            onClick={() => handleDelete(item.id)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              {totalPages > 1 && (
                <Pagination
                  currentPage={params.currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              )}
            </div>
          )}
          {showModal && (
            <ProductDetail id={productId} onShowModal={setShowModal} />
          )}
          {showModalAE && (
            <ProductModalAE
              id={productId}
              modalMode={modalMode}
              onShowModal={setShowModalAE}
              onSuccess={handleModalSuccess}
            />
          )}
        </div>
      </div>
    </>
  );
}
