// components/header/FavoritePopover.tsx
import Image from "next/image";
import Link from "next/link";
import { HeartCrack } from "lucide-react";
import { FavoriteProduct } from "@/hooks/useFavorite";

interface FavoritePopoverProps {
  items: FavoriteProduct[];
  onRemove: (productId: string | number) => void;
}

export default function FavoritePopover({ items, onRemove }: FavoritePopoverProps) {
  if (items.length === 0) {
    return (
      <div className="p-4 w-[260px] text-center">
        <p className="text-xs text-gray-600">💔 Chưa có sản phẩm yêu thích.</p>
      </div>
    );
  }

  return (
    <div className="p-3 w-[300px]">
      <div className="flex flex-col space-y-3 max-h-[40vh] overflow-y-auto pr-2">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between space-x-2">
            <div className="flex items-center space-x-2 overflow-hidden">
              <Image
                src={item.thumbnail || "/placeholder.png"}
                alt={item.title}
                width={50}
                height={50}
                className="rounded-md object-cover flex-shrink-0"
              />
              <div className="flex-grow">
                <p className="text-xs font-medium text-gray-800 line-clamp-2">
                  {item.title}
                </p>
                <p className="text-xs font-semibold text-red-500">
                  {item.price} $
                </p>
              </div>
            </div>
            <button
              onClick={() => onRemove(item.id)}
              className="text-gray-400 hover:text-red-500 transition-colors p-1"
              title="Bỏ thích"
            >
              <HeartCrack size={16} />
            </button>
          </div>
        ))}
      </div>
      <div className="border-t pt-3 mt-3 flex justify-center">
        <Link
          href="/user-profile"
          className="text-sm px-4 py-1 border border-black rounded-md hover:bg-black hover:text-white transition-all"
        >
          Xem tất cả
        </Link>
      </div>
    </div>
  );
}