"use client";

import { Eye, EyeClosed, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";

interface LoginModalProps {
  setOpenLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LoginModal({ setOpenLogin, setOpenRegister }: LoginModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("/api/auth/login", {
        username,
        password,
      });

    if (res.status === 200 && res.data?.accessToken) {
       localStorage.setItem("console_token", res.data.accessToken);
       localStorage.setItem("user", JSON.stringify(res.data.user));
       setOpenLogin(false);
       setTimeout(() => {
         window.location.reload();
       }, 100);
     } else { 
        setError(res.data?.message || "Đăng nhập thất bại!");
     }
    } catch (err: any) {
      setError("Tên đăng nhập hoặc mật khẩu không đúng!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-[999] flex items-center justify-center px-4">
      <div className="bg-white shadow-xl w-full max-w-md p-6 rounded-lg border border-gray-200 relative">
        {/* Header */}
        <div className="relative flex flex-col items-center justify-center mb-4">
          <h2 className="text-xl font-bold uppercase text-gray-900">Đăng nhập</h2>
          <X
            size={20}
            className="absolute top-0 right-0 cursor-pointer text-gray-700 hover:text-black transition-all"
            onClick={() => setOpenLogin(false)}
          />
          <p className="text-xs mt-2 text-center text-gray-700">
            Bạn chưa có tài khoản?{" "}
            <span
              className="font-semibold underline cursor-pointer text-blue-600 hover:text-blue-800 transition-colors"
              onClick={() => {
                setOpenLogin(false);
                setOpenRegister(true);
              }}
            >
              Đăng ký tại đây
            </span>
          </p>
        </div>

        {/* Error */}
        {error && <div className="text-red-500 text-sm mb-2 text-center">{error}</div>}

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Username */}
          <div className="flex flex-col">
            <label htmlFor="username" className="text-sm font-semibold text-gray-800 mb-1 uppercase">
              Tên đăng nhập
            </label>
            <input
              type="text"
              id="username"
              placeholder="Username *"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="text-sm border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
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
                value={password}
                placeholder="Mật khẩu *"
                onChange={(e) => setPassword(e.target.value)}
                className="text-sm px-3 py-2 flex-1 focus:outline-none bg-transparent"
              />
              <span
                className="px-2 cursor-pointer text-gray-700 hover:text-black transition-all"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye size={18} /> : <EyeClosed size={18} />}
              </span>
            </div>
          </div>

          {/* Forgot password */}
          <div className="text-xs text-gray-700">
            Quên mật khẩu? Khôi phục{" "}
            <Link
              href="/user/forgot-password"
              className="font-semibold underline text-blue-600 hover:text-blue-800 transition-colors"
            >
              tại đây
            </Link>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 bg-black text-white uppercase font-semibold rounded-md hover:bg-gray-900 transition-all disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Đang xử lý..." : "Đăng nhập"}
          </button>
        </form>
      </div>
    </div>
  );
}
