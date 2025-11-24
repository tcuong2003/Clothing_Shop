export interface Product {
  id?: string | number;
  title: string;
  description?: string;
  category?: string;
  price: number;
  discountPercentage?: number;
  rating?: number;
  stock?: number;
  tags?: string[];
  brand?: string;
  thumbnail?: string;
  reviews?: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  }[];
}

export interface ProductQuery {
  skip?: number;
  limit?: number;
  search?: string;
  q?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  order?: "asc" | "desc";
  total?: number;
}

export interface ProductListResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface ProductDelete {
  id: number;
  title?: string;
  description?: string;
  isDeleted: boolean;
  deletedOn: string;
}
