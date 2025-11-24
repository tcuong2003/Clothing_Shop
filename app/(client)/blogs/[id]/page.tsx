"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BlogDetailSkeleton from "../../../../components/BlogDetailSkeleton";

export default function BlogDetail() {
  const params = useParams();
  const [article, setArticle] = useState<any>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      const token = "3cdefe12e69b109a299c69c513134e20";
      const res = await fetch(
        `https://gnews.io/api/v4/top-headlines?token=${token}`
      );
      const data = await res.json();
      console.log("data: ", data);
      const found = data.articles.find((item: any) => item.id === params.id);
      setArticle(found);
    };

    fetchArticle();
  }, [params.id]);

  if (!article) return <BlogDetailSkeleton />;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-8">
      <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
      <img
        src={article.image}
        alt={article.title}
        className="w-full rounded-lg mb-4"
      />
      <p className="text-gray-700 leading-relaxed">{article.content}</p>
      <a
        href={article.url}
        target="_blank"
        className="inline-block mt-6 text-blue-600 font-semibold"
      >
        Đọc bài viết gốc
      </a>
    </div>
  );
}
