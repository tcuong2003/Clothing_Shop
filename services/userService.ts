import { User, UserDelete, UserListResponse, UserQuery } from "@/types/user.type";
import apiService from "./apiService";
import { cleanEmptyParams, URLParamsConfig } from "@/utils/urlParams";

class UserService {
  private endpoint = "/users";

   private normalizeQuery(query?: URLParamsConfig): UserQuery {
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

  async getAll(query?: URLParamsConfig): Promise<UserListResponse> {
    try {
      const normalizedQuery = this.normalizeQuery(query);
      const endpoint = normalizedQuery.q 
        ? `${this.endpoint}/search` 
        : this.endpoint;

      const res = await apiService.get<UserListResponse>(endpoint, {
        params: normalizedQuery,
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async getById(id: string | number): Promise<User> {
    try {
      const res = await apiService.get<User>(`${this.endpoint}/${id}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async create(
    userData: Omit<User, "id">
  ): Promise<User> {
    try {
      const response = await apiService.post<User>(
        `${this.endpoint}/add`,
        userData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  async update(
    id: string | number,
    userData: Partial<User>
  ): Promise<User> {
    try {
      const response = await apiService.patch<User>(
        `${this.endpoint}/${id}`,
        userData
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating user ${id}:`, error);
      throw error;
    }
  }

  async delete(id: string | number): Promise<UserDelete> {
    try {
      const response = await apiService.delete<UserDelete>(
        `${this.endpoint}/${id}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error deleting user ${id}:`, error);
      throw error;
    }
  }

  async search(keyword: string): Promise<User[]> {
    try {
      const response = await apiService.get<User[]>(
        `${this.endpoint}/search`,
        {
          params: { q: keyword },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error searching users:", error);
      throw error;
    }
  }
}

const userService = new UserService();
export default userService;
