"use client";

import { Eye, EyeClosed, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface RegisterModalProps {
  setOpenRegister: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function RegisterModal({ setOpenRegister, setOpenLogin }: RegisterModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Họ tên:", fullName);
    console.log("Email:", email);
    console.log("Mật khẩu:", password);
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-[999] flex items-center justify-center px-4">
      <div className="bg-white shadow-lg w-full max-w-md p-6 rounded-lg border border-gray-200 relative">
        {/* Header */}
        <div className="relative flex flex-col items-center justify-center mb-4">
          <h2 className="text-xl font-bold uppercase text-gray-900">Đăng ký</h2>
          <X
            size={20}
            className="absolute top-0 right-0 cursor-pointer text-gray-700 hover:text-black transition-all"
            onClick={() => setOpenRegister(false)}
          />
          <p className="text-xs mt-2 text-center text-gray-700">
            Bạn đã có tài khoản?{" "}
            <span
              className="font-semibold underline cursor-pointer text-blue-600 hover:text-blue-800 transition-colors"
              onClick={() => {
                setOpenRegister(false);
                setOpenLogin(true);
              }}
            >
              Đăng nhập tại đây
            </span>
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Full name */}
          <div className="flex flex-col">
            <label htmlFor="fullName" className="text-sm font-semibold text-gray-800 mb-1 uppercase">
              Tên bạn
            </label>
            <input
              type="text"
              id="fullName"
              placeholder="Họ tên của bạn *"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="text-sm border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-semibold text-gray-800 mb-1 uppercase">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-sm border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-semibold text-gray-800 mb-1 uppercase">
              Mật khẩu
            </label>
            <div className="flex items-center border border-gray-300 rounded-md">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Mật khẩu *"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="text-sm px-3 py-2 flex-1 focus:outline-none bg-transparent"
                required
              />
              <span
                className="px-2 cursor-pointer text-gray-700 hover:text-black transition-all"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye size={18} /> : <EyeClosed size={18} />}
              </span>
            </div>
          </div>

          {/* Terms */}
          <div className="flex flex-col items-start space-y-2">
            <label className="flex items-center space-x-2 text-xs text-gray-700">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
              <span>
                Tôi đồng ý với{" "}
                <Link href="/" className="font-semibold underline text-blue-600 mx-1">
                  Điều kiện sử dụng
                </Link>
                và{" "}
                <Link href="/" className="font-semibold underline text-blue-600 mx-1">
                  Chính sách của Clothing Shop
                </Link>
              </span>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 bg-black text-white uppercase font-semibold rounded-md hover:bg-gray-900 transition-all disabled:opacity-50"
          >
            Đăng ký
          </button>
        </form>
      </div>
    </div>
  );
}
