import { Truck, Shield } from "lucide-react"
import { Card } from "@/components/ui/card"

interface ProductFeaturesProps {
  shippingInformation: string
  warrantyInformation: string
}

export function ProductFeatures({ shippingInformation, warrantyInformation }: ProductFeaturesProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <Card className="p-4 flex items-start gap-3 border-border">
        <Truck className="h-5 w-5 text-accent mt-0.5" />
        <div>
          <p className="text-sm font-medium">Fast Shipping</p>
          <p className="text-xs text-muted-foreground">{shippingInformation}</p>
        </div>
      </Card>
      <Card className="p-4 flex items-start gap-3 border-border">
        <Shield className="h-5 w-5 text-accent mt-0.5" />
        <div>
          <p className="text-sm font-medium">Warranty</p>
          <p className="text-xs text-muted-foreground">{warrantyInformation}</p>
        </div>
      </Card>
    </div>
  )
}
