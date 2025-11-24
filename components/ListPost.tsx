"use client";
import UsePagination from "@/hooks/UsePagination";
import Image from "next/image";
import Pagination from "./Pagination";
import Link from "next/link";
import ItemPostSkeleton from "./ItemPostSkeleton";

export default function ListPost({ articles }: { articles: [] }) {
  const {
    currentPage,
    pageSize,
    totalPages,
    startIndex,
    paginatedData,
    handlePageChange,
    handlePageSizeChange,
  } = UsePagination(articles, 10);

  return (
    <>
      <div className="grid sm:grid-cols-2  mb-5 space-x-0 sm:space-x-5 space-y-5">
        {paginatedData.length > 0
          ? paginatedData.map((item: any, index: number) => (
              <div key={index} className="flex flex-col px-20 sm:px-0">
                <Link href={`/blogs/${item.id}`} className="cursor-pointer">
                  <div className="relative w-full h-[220px]">
                    <Image
                      src={item.image || "/fallback.jpg"}
                      alt={item.title}
                      fill
                      className="object-cover rounded-lg"
                      unoptimized
                    />
                  </div>
                  <div className="text-md font-semibold uppercase line-clamp-2">
                    {item.title}
                  </div>
                </Link>
                <div className="text-sm text-gray-500 line-clamp-2">
                  {item.description}
                </div>
              </div>
            ))
          : Array.from({ length: 6 }).map((_, index) => (
              <ItemPostSkeleton isNew={false} key={index} />
            ))}
      </div>
      {articles.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={articles.length}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      )}
    </>
  );
}
