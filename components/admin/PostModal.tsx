"use client";

import Spin from "@/components/admin/Spin";
import postService from "@/services/postService";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

import { toast } from "sonner";

interface UserModalAEProps {
  id?: string | number;
  modalMode: "add" | "edit";
  onShowModal: (show: boolean) => void;
  onSuccess?: () => void;
}

interface FormData {
  title: string;
  body: string;
  userId: number;
}

interface FormErrors {
  title?: string;
  body?: string;
}

const initialFormData: FormData = {
  title: "",
  body: "",
  userId: 1,
};

export default function PostModal({
  id,
  modalMode,
  onShowModal,
  onSuccess,
}: UserModalAEProps) {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (modalMode === "edit" && id) {
      fetchPostDetail();
    }
  }, [id, modalMode]);

  const fetchPostDetail = async () => {
    try {
      setLoading(true);
      const data = await postService.getById(id!);

      setFormData({
        title: data.title || "",
        body: data.body || "",
        userId: data.userId || 1,
      });
    } catch (err) {
      console.error("Error fetching post detail:", err);
      toast.error("Không thể tải thông tin bài viết");
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
    const newValue = name === "userId" ? Number(value) : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Tiêu đề không được để trống";
    }

    if (!formData.body.trim()) {
      newErrors.body = "Nội dung không được để trống";
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

      const postData = {
        title: formData.title.trim(),
        body: formData.body.trim(),
        userId: formData.userId,
      };

      if (modalMode === "add") {
        await postService.create(postData);
        toast.success("Thêm bài viết thành công!");
      } else {
        const updateData = {
          title: formData.title.trim(),
          body: formData.body.trim(),
        };
        await postService.update(id!, updateData);
        toast.success("Cập nhật bài viết thành công!");
      }

      onSuccess?.();
      onShowModal(false);
    } catch (err: any) {
      console.error("Error submitting form:", err);
      toast.error(
        err.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại"
      );
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
            {modalMode === "add" ? "Thêm bài viết mới" : "Chỉnh sửa bài viết"}
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
          <div
            style={{
              padding: "40px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Spin tip="Đang tải dữ liệu..." />
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="form-grid">
                <div className="form-group full-width">
                  <label htmlFor="title">
                    Tiêu đề <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Nhập tiêu đề bài viết"
                    className={errors.title ? "error" : ""}
                  />
                  {errors.title && (
                    <span className="error-message">{errors.title}</span>
                  )}
                </div>

                <div className="form-group full-width">
                  <label htmlFor="body">
                    Nội dung <span className="required">*</span>
                  </label>
                  <textarea
                    name="body"
                    id="body"
                    rows={10}
                    value={formData.body}
                    onChange={handleChange}
                    placeholder="Nhập nội dung bài viết..."
                    className={errors.body ? "error" : ""}
                  ></textarea>
                  {errors.body && (
                    <span className="error-message">{errors.body}</span>
                  )}
                </div>
                <input type="hidden" name="userId" value={formData.userId} />
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
