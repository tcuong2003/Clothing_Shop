import { Post, PostDelete, PostListResponse, PostQuery } from "@/types/post.type";
import apiService from "./apiService";

class PostService {
  private endpoint = "/posts";

  async getAll(query?: PostQuery): Promise<PostListResponse> {
    try {
      const res = await apiService.get<PostListResponse>(this.endpoint, {
        params: query,
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async getById(id: string | number): Promise<Post> {
    try {
      const res = await apiService.get<Post>(`${this.endpoint}/${id}`);
      return res.data;
    } catch (error) {
      throw error;
    }
  }

  async create(postData: Omit<Post, "id">): Promise<Post> {
    try {
      const response = await apiService.post<Post>(
        `${this.endpoint}/add`,
        postData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating post:", error);
      throw error;
    }
  }

  async update(
    id: string | number,
    postData: Partial<Post>
  ): Promise<Post> {
    try {
      const response = await apiService.patch<Post>(
        `${this.endpoint}/${id}`,
        postData
      );
      return response.data;
    } catch (error) {
      console.error(`Error updating post ${id}:`, error);
      throw error;
    }
  }

  async delete(id: string | number): Promise<PostDelete> {
    try {
      const response = await apiService.delete<PostDelete>(
        `${this.endpoint}/${id}`
      );
      return response.data;
    } catch (error) {
      console.error(`Error deleting post ${id}:`, error);
      throw error;
    }
  }

  async search(keyword: string): Promise<Post[]> {
    try {
      const response = await apiService.get<Post[]>(
        `${this.endpoint}/search`,
        {
          params: { q: keyword },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error searching posts:", error);
      throw error;
    }
  }
}

const postService = new  PostService();
export default postService;
