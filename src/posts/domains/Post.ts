export interface Post {
  pk: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PostRepository {
  getById(id: string): Promise<Post | undefined>;
  getAll(): Promise<Post[]>;
  create(post: Post): Promise<Post>;
  update(post: Post): Promise<Post>;
  delete(id: string): Promise<void>;
}
