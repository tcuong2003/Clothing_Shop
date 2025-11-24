"use client";

import Spin from "@/components/admin/Spin";
import categoryService from "@/services/categoryService";
import { CategoryListResponse } from "@/types/category.type";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

export default function CategoryPage() {
  const [categories, setCategories] = useState<CategoryListResponse>([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [filterCategories, setFilterCategories] = useState<CategoryListResponse>([]);

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        setLoading(true);
        const res = await categoryService.getAll();
        if (res) {
          setCategories(res);
          setFilterCategories(res);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error); 
      } finally {
        setLoading(false);
      }
    };
    fetchAPI();
  }, []);

  useEffect(() => {
    if (!keyword) {
      setFilterCategories(categories);
      return;
    }

    const searchLower = keyword.toLowerCase();

    const filtered = categories.filter(item => {
      const nameMatch = item.name.toLowerCase().includes(searchLower);
      const slugMatch = item.slug.toLowerCase().includes(searchLower);

      return nameMatch || slugMatch;
    });

    setFilterCategories(filtered);
    
  }, [keyword, categories]);
  

  return (
    <>
      <div className="p-4">
        <div className="container-page">
          <div className="header-page">
            <div className="page-toolbar">
              <div className="search-box">
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Tìm kiếm theo Tên hoặc Slug..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
              </div>
            </div>
          </div>
          {loading ? (
            <Spin />
          ) : (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>STT</th>
                    <th>Tên danh mục</th>
                    <th>Slug</th>
                  </tr>
                </thead>
                <tbody>
                  {filterCategories &&
                    filterCategories.map((item, index) => (
                      <tr key={item.slug}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.slug}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
