export interface BlogType {
  // _id?: string;
  // title?: string;
  // url?: string;
  // excerpt?: string;
  // className?: string;
  // created_at?: string;
  // content?: string;
  // projectName?: string;
  // projectUrl?: string;
  [key: string]: string;
}

export interface CommentType {
  _id: string;
  ip: string;
  name: string;
  content: string;
  updated_at: string;
  created_at: string;
  __v: number;
}

export interface PaginationType {
  page: number;
  limit: number;
  total: number;
  pages: number;
  hasNext: boolean;
  hasPrev: boolean;
}