"use client";
import Image from "next/image";
import Link from "next/link";
import ItemPostSkeleton from "./ItemPostSkeleton";

export default function ListNewPost({ newArticles }: { newArticles: any[] }) {

  return (
    <div className="grid space-y-4 bg-white">
      {newArticles.length > 0 ? 
        newArticles.map((item: any, index: number) => (
          <Link
            href={`/blogs/${item.id}`}
            key={index}
            className="flex flex-col justify-center items-center cursor-pointer"
          >
            <div className="relative w-full h-[220px]">
              <Image
                src={item.image || "/fallback.jpg"}
                alt={item.title}
                fill
                className="object-cover rounded-lg"
                unoptimized
              />
            </div>
            <div className="text-md font-semibold uppercase text-center line-clamp-2">
              {item.title}
            </div>
          </Link>
        )): 
        Array.from({length : 4}).map((_,index) => (
          <ItemPostSkeleton key={index} isNew={true}/>
        ))}
    </div>
  );
}
