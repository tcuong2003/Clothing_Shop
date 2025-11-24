import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ProductData } from "../hooks/useProductData"

interface ProductReviewsProps {
  reviews: ProductData["reviews"]
}

export function ProductReviews({ reviews }: ProductReviewsProps) {
  return (
    <section className="mt-20">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-serif font-medium">Customer Reviews</h2>
        <Button variant="outline">Write a Review</Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((review, index) => (
          <Card key={index} className="p-6 space-y-4 border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"}`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">{new Date(review.date).toLocaleDateString()}</span>
            </div>
            <p className="text-sm leading-relaxed text-foreground">{review.comment}</p>
            <p className="text-sm font-medium text-muted-foreground">{review.reviewerName}</p>
          </Card>
        ))}
      </div>
    </section>
  )
}
