import apiService from "./apiService";
import { Cart, CartListResponse, CartQuery } from "@/types/cart.type";

class CartService {
  private endpoint = "/carts";

  async getAll(query?: CartQuery): Promise<CartListResponse> {
    try {
      const res = await apiService.get<CartListResponse>(this.endpoint, {
        params: query,
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async getById(id: string | number): Promise<Cart> {
    try {
      const res = await apiService.get<Cart>(`${this.endpoint}/${id}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async create(productData: Omit<Cart, "id">): Promise<Cart> {
    try {
      const response = await apiService.post<Cart>(
        this.endpoint,
        productData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating cart:", error);
      throw error;
    }
  }

  async update(
    id: string | number,
    productData: Partial<Cart>
  ): Promise<Cart> {
    try {
      const response = await apiService.patch<Cart>(
        `${this.endpoint}/${id}`,
        productData
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating cart ${id}:`, error);
      throw error;
    }
  }

  async delete(id: string | number): Promise<{ message: string }> {
    try {
      const response = await apiService.delete<{ message: string }>(
        `${this.endpoint}/${id}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error deleting cart ${id}:`, error);
      throw error;
    }
  }

  async search(keyword: string): Promise<Cart[]> {
    try {
      const response = await apiService.get<Cart[]>(
        `${this.endpoint}/search`,
        {
          params: { q: keyword },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error searching carts:", error);
      throw error;
    }
  }
}

const cartService = new CartService();
export default cartService;
