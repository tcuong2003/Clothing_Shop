"use client";

import { ProductDetail } from "@/components/ProductDetail/ProductDetail";
import { useParams } from "next/navigation";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;

  return <ProductDetail productId={productId} />;
}
