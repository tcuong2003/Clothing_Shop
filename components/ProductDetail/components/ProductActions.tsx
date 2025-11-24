"use client"

import { useState } from "react"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/useCart"
import { ProductData } from "../hooks/useProductData"
import { useToast } from "@/hooks/use-toast"
import { CartToast } from "@/components/ui/cart-toast"
import LoginModal from "@/components/LoginModal"

interface ProductActionsProps {
  stock: number
  minimumOrderQuantity: number
  product: ProductData
}

export function ProductActions({ stock, minimumOrderQuantity, product }: ProductActionsProps) {
  const [quantity, setQuantity] = useState(1)
  const [openLogin, setOpenLogin] = useState(false)
  const { addToCart, isLoggedIn } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      setOpenLogin(true)
      return
    }

    const productData = {
      id: product.id,
      title: product.title,
      price: product.price,
      discountPercentage: product.discountPercentage,
      thumbnail: product.thumbnail,
      images: product.images,
    }
    
    const result = addToCart(productData, quantity)
    
    if (result) {
      // Show professional toast notification
      toast({
        variant: "success",
        description: <CartToast product={productData} quantity={quantity} />,
        duration: 3000,
      })
    }
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium">Quantity:</label>
          <div className="flex items-center border border-border rounded-md">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-4 py-2 hover:bg-muted transition-colors"
            >
              -
            </button>
            <span className="px-6 py-2 border-x border-border">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-4 py-2 hover:bg-muted transition-colors"
            >
              +
            </button>
          </div>
          <span className="text-sm text-muted-foreground">{stock} in stock</span>
        </div>

        <Button size="lg" className="w-full text-base h-12" onClick={handleAddToCart}>
          <ShoppingCart className="mr-2 h-5 w-5" />
          Add to Cart
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          Minimum order quantity: {minimumOrderQuantity} units
        </p>
      </div>

      {openLogin && (
        <LoginModal
          setOpenLogin={setOpenLogin}
          setOpenRegister={() => {}}
        />
      )}
    </>
  )
}
