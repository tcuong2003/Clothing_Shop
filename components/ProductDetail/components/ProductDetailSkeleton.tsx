import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div className="h-8 w-32 bg-muted animate-pulse rounded" />
          <nav className="flex items-center gap-6">
            <div className="h-4 w-12 bg-muted animate-pulse rounded" />
            <div className="h-4 w-12 bg-muted animate-pulse rounded" />
            <div className="h-10 w-10 bg-muted animate-pulse rounded" />
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Product Images Skeleton */}
          <div className="space-y-4">
            <div className="aspect-square bg-muted animate-pulse rounded-lg" />
            <div className="flex gap-3">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="aspect-square w-20 bg-muted animate-pulse rounded-md" />
              ))}
            </div>
          </div>

          {/* Product Info Skeleton */}
          <div className="space-y-8">
            {/* Title & Brand */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="h-6 w-20 bg-muted animate-pulse rounded" />
                <div className="h-6 w-16 bg-muted animate-pulse rounded" />
              </div>
              <div className="h-12 w-full bg-muted animate-pulse rounded" />
              <div className="h-12 w-3/4 bg-muted animate-pulse rounded" />
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-5 w-5 bg-muted animate-pulse rounded" />
                ))}
              </div>
              <div className="h-4 w-24 bg-muted animate-pulse rounded" />
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <div className="h-10 w-24 bg-muted animate-pulse rounded" />
              <div className="h-6 w-20 bg-muted animate-pulse rounded" />
              <div className="h-6 w-16 bg-muted animate-pulse rounded" />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <div className="h-4 w-full bg-muted animate-pulse rounded" />
              <div className="h-4 w-full bg-muted animate-pulse rounded" />
              <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
            </div>

            <Separator />

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-4 w-16 bg-muted animate-pulse rounded" />
                <div className="h-10 w-32 bg-muted animate-pulse rounded" />
                <div className="h-4 w-20 bg-muted animate-pulse rounded" />
              </div>
              <div className="h-12 w-full bg-muted animate-pulse rounded" />
              <div className="h-3 w-48 bg-muted animate-pulse rounded mx-auto" />
            </div>

            <Separator />

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              {[...Array(2)].map((_, i) => (
                <Card key={i} className="p-4 space-y-2">
                  <div className="h-5 w-5 bg-muted animate-pulse rounded" />
                  <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                  <div className="h-3 w-32 bg-muted animate-pulse rounded" />
                </Card>
              ))}
            </div>

            {/* Product Details */}
            <Card className="p-6 space-y-4">
              <div className="h-6 w-32 bg-muted animate-pulse rounded" />
              <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-4 w-full bg-muted animate-pulse rounded" />
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Reviews Section Skeleton */}
        <section className="mt-20">
          <div className="flex items-center justify-between mb-8">
            <div className="h-8 w-48 bg-muted animate-pulse rounded" />
            <div className="h-10 w-32 bg-muted animate-pulse rounded" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, j) => (
                      <div key={j} className="h-4 w-4 bg-muted animate-pulse rounded" />
                    ))}
                  </div>
                  <div className="h-3 w-20 bg-muted animate-pulse rounded" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-full bg-muted animate-pulse rounded" />
                  <div className="h-4 w-3/4 bg-muted animate-pulse rounded" />
                </div>
                <div className="h-4 w-32 bg-muted animate-pulse rounded" />
              </Card>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="h-4 w-64 bg-muted animate-pulse rounded mx-auto" />
        </div>
      </footer>
    </div>
  )
}
