export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  maidenName?: string;
  age: number;
  gender: "male" | "female" | string;
  email?: string;
  phone: string;
  username?: string;
  password?: string;
  birthDate: string;
  image: string;
}

export interface UserQuery {
  skip?: number;
  limit?: number;
  q?: string;
  sortBy?: string;
  order?: "asc" | "desc";
}

export interface UserListResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

export interface UserDelete {
  id: number;
  username?: string;
  isDeleted: boolean;
  deletedOn: string;
}

