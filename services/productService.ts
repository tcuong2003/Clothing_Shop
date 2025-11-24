import {
  Product,
  ProductDelete,
  ProductListResponse,
  ProductQuery,
} from "@/types/product.type";
import apiService from "./apiService";
import { cleanEmptyParams, URLParamsConfig } from "@/utils/urlParams";

class ProductService {
  private endpoint = "/products";

  private normalizeQuery(query?: URLParamsConfig): ProductQuery {
    if (!query) return {};

    const cleaned = cleanEmptyParams(query);

    return {
      limit: cleaned.limit as number,
      skip: cleaned.skip as number,
      q: cleaned.q as string,
      sortBy: cleaned.sortBy as string,
      order: cleaned.order as 'asc' | 'desc',
    };
  }

  async getAll(query?: URLParamsConfig): Promise<ProductListResponse> {
    try {
      const normalizedQuery = this.normalizeQuery(query);
      const endpoint = normalizedQuery.q 
        ? `${this.endpoint}/search` 
        : this.endpoint;

      const res = await apiService.get<ProductListResponse>(endpoint, {
        params: normalizedQuery,
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async getById(id: string | number): Promise<Product> {
    try {
      const res = await apiService.get<Product>(`${this.endpoint}/${id}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async create(productData: Omit<Product, "id">): Promise<Product> {
    try {
      const response = await apiService.post<Product>(
        `${this.endpoint}/add`,
        productData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  }

  async update(
    id: string | number,
    productData: Partial<Product>
  ): Promise<Product> {
    try {
      const response = await apiService.patch<Product>(
        `${this.endpoint}/${id}`,
        productData
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating product ${id}:`, error);
      throw error;
    }
  }

  async delete(id: string | number): Promise<ProductDelete> {
    try {
      const response = await apiService.delete<ProductDelete>(
        `${this.endpoint}/${id}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error deleting product ${id}:`, error);
      throw error;
    }
  }

  async search(
    keyword: string,
    query?: URLParamsConfig
  ): Promise<ProductListResponse> {
    try {
      const normalizedQuery = this.normalizeQuery({
        ...query,
        search: keyword,
      });
      const response = await apiService.get<ProductListResponse>(
        this.endpoint,
        { params: normalizedQuery }
      );
      return response.data;
    } catch (error) {
      console.error("Error searching products:", error);
      throw error;
    }
  }
}

const productService = new ProductService();
export default productService;
