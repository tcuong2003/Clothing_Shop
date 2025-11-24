"use client";

import ProductItem from "@/components/ProductItem";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  title: string;
  price: number;
  images: string[];
  discountPercentage?: number;
  category?: string;
}

export default function ProductPage() {
  const [swipers, setSwipers] = useState<{ [key: string]: any }>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedIndexes, setSelectedIndexes] = useState<{ [key: string]: number }>({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true); // 🧩 trạng thái loading
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const categories = [
          "mens-shirts",
          "womens-shoes",
          "mens-shoes",
          "womens-dresses",
          "tops",
          "womens-bags",
          "womens-jewellery",
        ];

        const allProducts: Product[] = [];

        for (const cat of categories) {
          const res = await fetch(`https://dummyjson.com/products/category/${cat}`);
          const data = await res.json();

          const formatted = data.products.map((item: any) => ({
            id: item.id.toString(),
            title: item.title,
            price: item.price * 25000,
            images: item.images && item.images.length > 0 ? item.images : [item.thumbnail],
            discount: item.discountPercentage,
            category: item.category,
          }));

          allProducts.push(...formatted);
        }

        setProducts(allProducts);
      } catch (error) {
        console.error("❌ Lỗi khi tải sản phẩm:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleCategoryChange = (cat: string | null) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const categoryNames: { [key: string]: string } = {
    "mens-shirts": "Áo sơ mi nam",
    "womens-shoes": "Giày nữ",
    "mens-shoes": "Giày nam",
    "womens-dresses": "Đầm nữ",
    "tops": "Áo thun / Áo kiểu",
    "womens-bags": "Túi xách nữ",
    "womens-jewellery": "Trang sức nữ",
  };

  // 🎨 Skeleton UI cho sản phẩm đang tải
  const renderSkeleton = () => (
    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="border rounded-lg p-4 animate-pulse bg-white shadow-sm"
        >
          <div className="bg-gray-200 h-40 w-full rounded-md mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="xl:px-40 lg:px-10 md:px-5 sm:px-5 px-4 py-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <aside className="w-full md:w-1/4 border border-gray-200 rounded-lg p-4 h-fit">
          <div className="text-lg font-semibold mb-3">Bộ lọc</div>

          {/* Tìm kiếm */}
          <input
            type="text"
            placeholder="Tìm sản phẩm..."
            className="w-full border border-gray-300 rounded-md p-2 text-sm mb-4 focus:outline-none focus:ring focus:ring-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Category */}
          <div className="space-y-2">
            <button
              className={`block w-full text-left px-3 py-2 rounded-md ${
                selectedCategory === null ? "bg-black text-white" : "hover:bg-gray-100"
              }`}
              onClick={() => handleCategoryChange(null)}
            >
              Tất cả
            </button>

            {Object.keys(categoryNames).map((cat) => (
              <button
                key={cat}
                className={`block w-full text-left px-3 py-2 rounded-md ${
                  selectedCategory === cat ? "bg-black text-white" : "hover:bg-gray-100"
                }`}
                onClick={() => handleCategoryChange(cat)}
              >
                {categoryNames[cat]}
              </button>
            ))}
          </div>
        </aside>

        {/* Danh sách sản phẩm */}
        <main className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <div className="text-base md:text-lg font-semibold">TẤT CẢ SẢN PHẨM</div>
          </div>

          {/* Hiển thị khi loading */}
          {loading ? (
            renderSkeleton()
          ) : paginatedProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {paginatedProducts.map((product) => (
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
          ) : (
            <p className="text-center text-gray-500 mt-10">Không có sản phẩm nào</p>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 flex-wrap gap-2">
              <button
                className="px-3 py-1 border rounded-md disabled:opacity-50"
                disabled={currentPage === 1}
                onClick={() => {
                  setCurrentPage(1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Trang đầu
              </button>

              <button
                className="px-3 py-1 border rounded-md disabled:opacity-50"
                disabled={currentPage === 1}
                onClick={() => {
                  setCurrentPage((prev) => prev - 1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Trước
              </button>

              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  className={`px-3 py-1 border rounded-md ${
                    currentPage === i + 1 ? "bg-black text-white" : "hover:bg-gray-100"
                  }`}
                  onClick={() => {
                    setCurrentPage(i + 1);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  {i + 1}
                </button>
              ))}

              <button
                className="px-3 py-1 border rounded-md disabled:opacity-50"
                disabled={currentPage === totalPages}
                onClick={() => {
                  setCurrentPage((prev) => prev + 1);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Sau
              </button>

              <button
                className="px-3 py-1 border rounded-md disabled:opacity-50"
                disabled={currentPage === totalPages}
                onClick={() => {
                  setCurrentPage(totalPages);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Trang cuối
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}