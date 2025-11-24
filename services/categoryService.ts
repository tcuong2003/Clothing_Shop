import {
  Category,
  CategoryListResponse,
  CategoryQuery,
} from "@/types/category.type";
import apiService from "./apiService";

class CategoryService {
  private endpoint = "/products/categories";

  async getAll(query?: CategoryQuery): Promise<CategoryListResponse> {
    try {
      const res = await apiService.get<CategoryListResponse>(this.endpoint, {
        params: query,
      });
      return res.data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  }

  async getBySlug(slug: string): Promise<Category> {
    try {
      const res = await apiService.get<Category>(`${this.endpoint}/${slug}`);
      return res.data;
    } catch (error) {
      console.error(`Error fetching category ${slug}:`, error);
      throw error;
    }
  }
}

const categoryService = new CategoryService();
export default categoryService;
