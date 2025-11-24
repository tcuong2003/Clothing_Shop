export interface Reactions {
  likes: number;
  dislikes: number;
}

export interface Post {
  id?: number;
  title: string;
  body: string;
  tags?: string[];
  reactions?: Reactions;
  views?: number;
  userId?: number;
}

export interface PostQuery {
  skip?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
}

export interface PostListResponse {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
}

export interface PostDelete {
  id: number;
  title?: string;
  isDeleted: boolean;
  deletedOn: string;
}
