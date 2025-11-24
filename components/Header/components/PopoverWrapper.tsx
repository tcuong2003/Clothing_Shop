// components/header/PopoverWrapper.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";

interface PopoverWrapperProps {
  trigger: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export default function PopoverWrapper({
  trigger,
  children,
  className = "",
}: PopoverWrapperProps) {
  const [isOpen, setIsOpen] = useState(false);
  // Tạo một ref để tham chiếu đến DOM element của component
  const popoverRef = useRef<HTMLDivElement>(null);

  // Hàm để bật/tắt popover
  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  // Sử dụng useEffect để thêm và gỡ bỏ event listener
  useEffect(() => {
    // Hàm xử lý khi click ra ngoài
    function handleClickOutside(event: MouseEvent) {
      // Nếu ref tồn tại và click không nằm trong element của ref
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false); // Đóng popover
      }
    }

    // Nếu popover đang mở, lắng nghe sự kiện click trên toàn bộ document
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      // Nếu popover đóng, không cần lắng nghe nữa
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup function: Gỡ bỏ event listener khi component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]); // Effect này sẽ chạy lại mỗi khi state `isOpen` thay đổi

  return (
    // Gắn ref vào thẻ div bao ngoài cùng
    <div className="relative inline-block" ref={popoverRef}>
      {/* 
        Thêm onClick để toggle.
        Thêm các class của Tailwind để tạo hiệu ứng hover.
        - `p-1 rounded-md`: Tạo khoảng đệm và bo góc cho vùng hover.
        - `transition-colors`: Thêm hiệu ứng chuyển màu mượt mà.
        - `hover:bg-gray-100`: Thay đổi màu nền khi hover.
      */}
      <div
        onClick={handleToggle}
        className="cursor-pointer p-1 rounded-md transition-colors hover:bg-gray-100"
      >
        {trigger}
      </div>

      {/* 
        Sử dụng conditional rendering (render có điều kiện).
        Chỉ render popover content khi `isOpen` là true.
        Điều này tốt hơn là dùng class 'hidden'.
      */}
      {isOpen && (
        <div
          // `w-max` để chiều rộng của popover co giãn theo nội dung
          className={`absolute right-0 top-full mt-2 w-max bg-white shadow-lg border border-gray-200 rounded-md z-50 ${className}`}
        >
          {children}
        </div>
      )}
    </div>
  );
}