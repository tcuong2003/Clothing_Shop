"use client";

import productService from "@/services/productService";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import Spin from "./Spin";
import categoryService from "@/services/categoryService";
import { Category } from "@/types/category.type";
import { toast } from "sonner";

interface ProductModalAEProps {
  id?: string | number;
  modalMode: "add" | "edit";
  onShowModal: (show: boolean) => void;
  onSuccess?: () => void;
}

interface FormData {
  title: string;
  description: string;
  category: string;
  price: string;
  discountPercentage: string;
  stock: string;
  thumbnail: string;
}

interface FormErrors {
  title?: string;
  description?: string;
  category?: string;
  price?: string;
  stock?: string;
  thumbnail?: string;
}

const initialFormData: FormData = {
  title: "",
  description: "",
  category: "",
  price: "",
  discountPercentage: "",
  stock: "",
  thumbnail: "",
};

export default function ProductModalAE({
  id,
  modalMode,
  onShowModal,
  onSuccess,
}: ProductModalAEProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (modalMode === "edit" && id) {
      fetchProductDetail();
    }
  }, [id, modalMode]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const categoryData = await categoryService.getAll();
      setCategories(categoryData);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const fetchProductDetail = async () => {
    try {
      setLoading(true);
      const data = await productService.getById(id!);

      setFormData({
        title: data.title || "",
        description: data.description || "",
        category: data.category || "",
        price: data.price?.toString() || "",
        discountPercentage: data.discountPercentage?.toString() || "",
        stock: data.stock?.toString() || "",
        thumbnail: data.thumbnail || "",
      });
    } catch (err) {
      console.error("Error fetching product:", err);
      alert("Không thể tải thông tin sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Tên sản phẩm không được để trống";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Mô tả không được để trống";
    }

    if (!formData.category.trim()) {
      newErrors.category = "Danh mục không được để trống";
    }

    if (!formData.price || Number(formData.price) <= 0) {
      newErrors.price = "Giá phải lớn hơn 0";
    }

    if (!formData.stock || Number(formData.stock) < 0) {
      newErrors.stock = "Số lượng phải lớn hơn hoặc bằng 0";
    }

    if (!formData.thumbnail.trim()) {
      newErrors.thumbnail = "URL hình ảnh không được để trống";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setSubmitting(true);

      const productData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        category: formData.category.trim(),
        price: Number(formData.price),
        discountPercentage: Number(formData.discountPercentage) || 0,
        stock: Number(formData.stock),
        thumbnail: formData.thumbnail.trim(),
      };

      if (modalMode === "add") {
        await productService.create(productData);
        toast.success("Thêm sản phẩm thành công!");
      } else {
        await productService.update(id!, productData);
        toast.success("Cập nhật sản phẩm thành công!");
      }

      onSuccess?.();
      onShowModal(false);
    } catch (err: any) {
      console.error("Error submitting form:", err);
      alert(err.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    if (submitting) return;
    onShowModal(false);
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>
            {modalMode === "add" ? "Thêm sản phẩm mới" : "Chỉnh sửa sản phẩm"}
          </h2>
          <button
            className="btn-close"
            onClick={handleClose}
            disabled={submitting}
          >
            <X size={24} />
          </button>
        </div>

        {loading ? (
          <div style={{ padding: "40px" }}>
            <Spin tip="Đang tải dữ liệu..." />
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group full-width">
                  <label htmlFor="title">
                    Tên sản phẩm <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Nhập tên sản phẩm"
                    className={errors.title ? "error" : ""}
                  />
                  {errors.title && (
                    <span className="error-message">{errors.title}</span>
                  )}
                </div>

                <div className="form-group full-width">
                  <label htmlFor="thumbnail">
                    URL Hình ảnh <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="thumbnail"
                    name="thumbnail"
                    value={formData.thumbnail}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                    className={errors.thumbnail ? "error" : ""}
                  />
                  {errors.thumbnail && (
                    <span className="error-message">{errors.thumbnail}</span>
                  )}
                  {formData.thumbnail && (
                    <div className="image-preview">
                      <img
                        src={formData.thumbnail}
                        alt="Preview"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://via.placeholder.com/150?text=Invalid+URL";
                        }}
                      />
                    </div>
                  )}
                </div>

                <div className="form-group full-width">
                  <label htmlFor="description">
                    Mô tả <span className="required">*</span>
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    rows={5}
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Nhập mô tả sản phẩm"
                    className={errors.description ? "error" : ""}
                  ></textarea>
                  {errors.description && (
                    <span className="error-message">{errors.description}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="category">Danh mục</label>
                  <select
                    name="category"
                    id="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={errors.category ? "error" : ""}
                    disabled={loading}
                  >
                    <option value="">-- Chọn danh mục --</option>
                    {categories.map((category) => (
                      <option key={category.slug} value={category.slug}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="price">
                    Giá ($) <span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className={errors.price ? "error" : ""}
                  />
                  {errors.price && (
                    <span className="error-message">{errors.price}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="discountPercentage">Giảm giá (%)</label>
                  <input
                    type="number"
                    id="discountPercentage"
                    name="discountPercentage"
                    value={formData.discountPercentage}
                    onChange={handleChange}
                    placeholder="0"
                    step="0.01"
                    min="0"
                    max="100"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="stock">
                    Số lượng <span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                    className={errors.stock ? "error" : ""}
                  />
                  {errors.stock && (
                    <span className="error-message">{errors.stock}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary btn-fixed-width"
                onClick={handleClose}
                disabled={submitting}
              >
                Hủy
              </button>
              <button
                type="submit"
                className="btn btn-primary btn-fixed-width"
                disabled={submitting}
              >
                {modalMode === "add" ? "Thêm mới" : "Cập nhật"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
