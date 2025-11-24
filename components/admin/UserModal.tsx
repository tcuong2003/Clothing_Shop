"use client";

import Spin from "@/components/admin/Spin";
import userService from "@/services/userService";
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
  firstName: string;
  lastName: string;
  password: string;
  age: string;
  gender: string;
  phone: string;
  birthDate: string;
  image: string; 
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  password?: string;
  age?: string;
  gender?: string;
  phone?: string;
  birthDate?: string;
  image?: string;
}

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  password: "",
  age: "",
  gender: "",
  phone: "",
  birthDate: "",
  image: "",
};

export default function UserModal({
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
      fetchUserDetail();
    }
  }, [id, modalMode]);

  const fetchUserDetail = async () => {
    try {
      setLoading(true);
      const data = await userService.getById(id!);

      setFormData({
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        password: "",
        age: data.age?.toString() || "",
        gender: data.gender || "",
        phone: data.phone || "",
        birthDate: data.birthDate || "",
        image: data.image || "",
      });
    } catch (err) {
      console.error("Error fetching user detail:", err);
      toast.error("Không thể tải thông tin người dùng");
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

    if (!formData.firstName.trim()) {
      newErrors.firstName = "Tên không được để trống";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Họ không được để trống";
    }

    if (modalMode === "add" && !formData.password.trim()) {
      newErrors.password = "Mật khẩu không được để trống";
    }

    if (
      !formData.age ||
      Number(formData.age) <= 0 ||
      Number(formData.age) > 100
    ) {
      newErrors.age = "Tuổi phải hợp lệ (1-100)";
    }

    if (!formData.gender.trim()) {
      newErrors.gender = "Giới tính không được để trống";
    }

    if (!formData.phone.match(/^\d{10,11}$/)) {
      newErrors.phone = "Số điện thoại không hợp lệ";
    }

    if (!formData.birthDate) {
      newErrors.birthDate = "Ngày sinh không được để trống";
    }

    if (!formData.image.trim()) {
      newErrors.image = "URL ảnh đại diện không được để trống";
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

      const userData = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        age: Number(formData.age),
        gender: formData.gender.trim(),
        phone: formData.phone.trim(),
        birthDate: formData.birthDate.trim(),
        image: formData.image.trim(),
        ...(formData.password && { password: formData.password }),
      };

      if (modalMode === "add") {
        await userService.create(userData);
        toast.success("Thêm người dùng thành công!");
      } else {
        await userService.update(id!, userData);
        toast.success("Cập nhật người dùng thành công!");
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
            {modalMode === "add"
              ? "Thêm người dùng mới"
              : "Chỉnh sửa người dùng"}
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
              <div className="form-grid ">
                <div className="form-group">
                  <label htmlFor="firstName">
                    Tên <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Nhập tên"
                    className={errors.firstName ? "error" : ""}
                  />
                  {errors.firstName && (
                    <span className="error-message">{errors.firstName}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="lastName">
                    Họ <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Nhập họ"
                    className={errors.lastName ? "error" : ""}
                  />
                  {errors.lastName && (
                    <span className="error-message">{errors.lastName}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="password">
                    Mật khẩu{" "}
                    {modalMode === "add" && <span className="required">*</span>}
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder={
                      modalMode === "add"
                        ? "Nhập mật khẩu"
                        : "Để trống nếu không đổi"
                    }
                    className={errors.password ? "error" : ""}
                  />
                  {errors.password && (
                    <span className="error-message">{errors.password}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="phone">
                    Số điện thoại <span className="required">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="VD: 0901234567"
                    className={errors.phone ? "error" : ""}
                  />
                  {errors.phone && (
                    <span className="error-message">{errors.phone}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="age">
                    Tuổi <span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Tuổi"
                    min="1"
                    max="100"
                    className={errors.age ? "error" : ""}
                  />
                  {errors.age && (
                    <span className="error-message">{errors.age}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="gender">
                    Giới tính <span className="required">*</span>
                  </label>
                  <select
                    name="gender"
                    id="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={errors.gender ? "error" : ""}
                    disabled={loading}
                  >
                    <option value="">-- Chọn giới tính --</option>
                    <option value="male">Nam</option>
                    <option value="female">Nữ</option>
                    <option value="other">Khác</option>
                  </select>
                  {errors.gender && (
                    <span className="error-message">{errors.gender}</span>
                  )}
                </div>

                <div className="form-group full-width">
                  <label htmlFor="birthDate">
                    Ngày sinh <span className="required">*</span>
                  </label>
                  <input
                    type="date"
                    id="birthDate"
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    className={errors.birthDate ? "error" : ""}
                  />
                  {errors.birthDate && (
                    <span className="error-message">{errors.birthDate}</span>
                  )}
                </div>

                <div className="form-group full-width">
                  <label htmlFor="image">
                    URL Ảnh đại diện <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://example.com/avatar.jpg"
                    className={errors.image ? "error" : ""}
                  />
                  {errors.image && (
                    <span className="error-message">{errors.image}</span>
                  )}
                  {formData.image && (
                    <div
                      className="image-preview"
                      style={{
                        width: "100px",
                        height: "100px",
                        marginTop: "10px",
                        borderRadius: "50%",
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={formData.image}
                        alt="Preview Avatar"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "https://placehold.co/100x100/eeeeee/333333?text=Avatar";
                        }}
                      />
                    </div>
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
