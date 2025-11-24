import { Card } from "@/components/ui/card"
import { ProductData } from "../hooks/useProductData"

interface ProductDetailsProps {
  product: ProductData
}

export function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <Card className="p-6 space-y-4 border-border">
      <h3 className="text-lg font-serif font-medium">Product Details</h3>
      <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
        <div>
          <span className="text-muted-foreground">SKU:</span>
          <span className="ml-2 text-foreground">{product.sku}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Weight:</span>
          <span className="ml-2 text-foreground">{product.weight}g</span>
        </div>
        <div>
          <span className="text-muted-foreground">Dimensions:</span>
          <span className="ml-2 text-foreground">
            {product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth} cm
          </span>
        </div>
        <div>
          <span className="text-muted-foreground">Status:</span>
          <span className="ml-2 text-accent font-medium">{product.availabilityStatus}</span>
        </div>
      </div>
    </Card>
  )
}
