// components/header/CartPopover.tsx
import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { CartItem } from "@/hooks/useCart";

interface CartPopoverProps {
  items: CartItem[];
  onRemove: (productId: string | number) => void;
}

export default function CartPopover({ items, onRemove }: CartPopoverProps) {
  if (items.length === 0) {
    return (
      <div className="p-4 w-[260px] text-center">
        <p className="text-xs text-gray-600">🛒 Giỏ hàng của bạn đang trống.</p>
      </div>
    );
  }

  return (
    <div className="p-3 w-[320px]">
      <div className="flex flex-col space-y-4 max-h-[40vh] overflow-y-auto pr-2">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-2 overflow-hidden">
              <Image
                src={item.thumbnail || "/placeholder.png"}
                alt={item.title}
                width={60}
                height={60}
                className="rounded-md object-cover flex-shrink-0"
              />
              <div className="flex-grow">
                <p className="text-xs font-medium text-gray-800 line-clamp-2">
                  {item.title}
                </p>
                <p className="text-xs text-gray-600">Quantity: {item.quantity}</p>
                <p className="text-xs font-semibold text-gray-800">
                  {item.price} $
                </p>
              </div>
            </div>
            <button
              onClick={() => onRemove(item.id)}
              className="text-gray-400 hover:text-red-500 transition-colors p-1"
              title="Xóa khỏi giỏ hàng"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
      <div className="border-t pt-3 mt-3 flex justify-center">
        <Link
          href="/user-profile"
          className="text-sm px-4 py-1 border border-black rounded-md hover:bg-black hover:text-white transition-all"
        >
          Xem giỏ hàng
        </Link>
      </div>
    </div>
  );
}