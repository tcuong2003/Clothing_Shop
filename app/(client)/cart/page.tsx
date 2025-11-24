"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductItem from "@/components/ProductItem";

interface Product {
  id: string;
  name: string;
  title: string;
  price: number;
  images: string[];
  discount?: number;
  quantity: number;
}

export default function Cart() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedIndexes, setSelectedIndexes] = useState<{ [key: string]: number }>({});
  const [swipers, setSwipers] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    const fakeProducts: Product[] = [
      {
        id: "product_1",
        name: "Quần bò",
        title: "Quần bò",
        price: 1599000,
        images: ["/do.jpg"],
        quantity: 1,
      },
      {
        id: "product_2",
        name: "Áo khoác",
        title: "Áo khoác",
        price: 1899000,
        images: ["/vest.png"],
        quantity: 1,
      },
      {
        id: "product_3",
        name: "Váy hoa",
        title: "Váy hoa",
        price: 990000,
        images: ["/quan.jpg"],
        discount: 50,
        quantity: 1,
      },
    ];
    setProducts(fakeProducts);
  }, []);

  const handleIncrease = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: p.quantity + 1 } : p))
    );
  };

  const handleDecrease = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: Math.max(1, p.quantity - 1) } : p))
    );
  };

  const handleChange = (id: string, value: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, quantity: Math.max(1, value) } : p))
    );
  };

  const handleRemove = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const getTotal = (price: number, quantity: number, discount?: number) => {
    const finalPrice = discount ? price * (1 - discount / 100) : price;
    return finalPrice * quantity;
  };

  const totalCart = products.reduce(
    (acc, p) => acc + getTotal(p.price, p.quantity, p.discount),
    0
  );

  return (
    <>
      <div className="xl:px-40 lg:px-10 md:px-6 sm:px-4 px-4 py-4">
        <div className="flex flex-col items-center justify-center space-y-2 md:space-y-4 py-10">
          <span className="text-xl md:text-4xl font-semibold">Giỏ hàng của bạn</span>
          <span className="text-sm font-semibold text-gray-500 capitalize">
            có {products.length} sản phẩm trong giỏ hàng
          </span>
        </div>

        {/* Desktop Table */}
        <table className="w-full border border-gray-100 table-auto hidden md:table">
          <thead className="bg-[#F9F9F9]">
            <tr>
              <th className="p-2 text-left">Sản phẩm</th>
              <th className="p-2 text-center">Đơn giá</th>
              <th className="p-2 text-center">Số lượng</th>
              <th className="p-2 text-center">Tổng</th>
              <th className="p-2 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t border-gray-100">
                <td className="p-2 flex items-center gap-3">
                  <Image src={p.images[0]} alt={p.name} width={60} height={60} className="rounded-md" />
                  <span>{p.name}</span>
                </td>
                <td className="text-center">
                  {p.discount ? (
                    <>
                      <span className="line-through text-sm text-gray-400">{p.price.toLocaleString()}₫</span>
                      <br />
                      <span className="text-red-500 font-semibold">
                        {(p.price * (1 - p.discount / 100)).toLocaleString()}₫
                      </span>
                    </>
                  ) : (
                    <span>{p.price.toLocaleString()}₫</span>
                  )}
                </td>
                <td className="text-center">
                  <div className="flex justify-center items-center gap-2">
                    <Button size="sm" onClick={() => handleDecrease(p.id)}>-</Button>
                    <input
                      type="number"
                      min={1}
                      value={p.quantity}
                      onChange={(e) => handleChange(p.id, parseInt(e.target.value))}
                      className="w-10 h-8 text-center rounded border text-sm"
                    />
                    <Button size="sm" onClick={() => handleIncrease(p.id)}>+</Button>
                  </div>
                </td>
                <td className="text-center font-semibold">
                  {getTotal(p.price, p.quantity, p.discount).toLocaleString()}₫
                </td>
                <td className="text-center">
                  <Button variant="destructive" size="sm" onClick={() => handleRemove(p.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Mobile View */}
        <div className="md:hidden space-y-6">
          {products.map((p) => (
            <div key={p.id} className="border rounded-lg p-4 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <Image src={p.images[0]} alt={p.name} width={60} height={60} className="rounded-md" />
                <div>
                  <h3 className="font-semibold">{p.name}</h3>
                  <p className="text-sm text-gray-500">
                    {p.discount ? (
                      <>
                        <span className="line-through">{p.price.toLocaleString()}₫</span>{" "}
                        <span className="text-red-500 font-semibold">
                          {(p.price * (1 - p.discount / 100)).toLocaleString()}₫
                        </span>
                      </>
                    ) : (
                      <span>{p.price.toLocaleString()}₫</span>
                    )}
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Button size="sm" onClick={() => handleDecrease(p.id)}>-</Button>
                  <input
                    type="number"
                    min={1}
                    value={p.quantity}
                    onChange={(e) => handleChange(p.id, parseInt(e.target.value))}
                    className="w-10 h-8 text-center rounded border text-sm"
                  />
                  <Button size="sm" onClick={() => handleIncrease(p.id)}>+</Button>
                </div>
                <Button variant="destructive" size="sm" onClick={() => handleRemove(p.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-right font-semibold">
                Tổng: {getTotal(p.price, p.quantity, p.discount).toLocaleString()}₫
              </p>
            </div>
          ))}
        </div>

        {/* Tổng tiền và hành động */}
        <div className="flex justify-end items-end gap-2 py-5">
          <span className="text-base">Tổng số tiền:</span>
          <span className="text-xl font-bold">{totalCart.toLocaleString()}₫</span>
        </div>

        <div className="flex-col md:flex-row border-t border-gray-100 flex items-center justify-between gap-4">
          <Link href="/" passHref>
            <div className="px-4 py-2 mt-5 w-full md:w-auto text-center border border-gray-200 font-semibold uppercase text-sm md:text-base cursor-pointer">
              Tiếp tục mua sắm
            </div>
          </Link>
          <Link href="/checkout" passHref>
            <div className="px-4 py-2 mt-5 w-full md:w-auto text-center bg-black text-white uppercase text-sm md:text-base cursor-pointer hover:bg-gray-800 transition">
              Tiến hành thanh toán
            </div>
          </Link>
        </div>
      </div>

      {/* Gợi ý sản phẩm */}
      <div className="xl:px-40 md:px-5 px-5 py-10">
        <h2 className="text-xl text-gray-600 uppercase font-semibold mb-4">Có thể bạn cũng thích</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              selectedIndexes={selectedIndexes}
              setSelectedIndexes={setSelectedIndexes}
              swipers={swipers}
              setSwipers={setSwipers}
            />
          ))}
        </div>
      </div>
    </>
  );
}
