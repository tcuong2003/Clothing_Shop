"use client";

import cartService from "@/services/cartService";
import { Cart } from "@/types/cart.type";
import { useEffect, useState } from "react";

export default function CartPage() {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        setLoading(true);

        const data = await cartService.getAll();

        if (data && data.carts) {
          setCarts(data.carts);
        }
      } catch (err: any) {
        console.error("Error fetching carts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAPI();
  }, []);

  if (loading) {
    return <div>Loading carts...</div>;
  }

  console.log("carts: ", carts);
  
  return <></>;
}
