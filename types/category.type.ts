export interface Category {
  slug: string;
  name: string; 
  url: string; 
}

export interface CategoryQuery {
  limit?: number;
  skip?: number;
  search?: string;
  sortBy?: string;
}

export type CategoryListResponse = Category[];

