export type CommentFromDB = {
  id: number;
  userId: number | null;
  createdAt: string;
  updatedAt: string;
  comment: string;
  postId: number;
  user: {
    name: string;
  };
};

export type PostFromDB = {
  id: number;
  userId: number;
  title: string;
  slug: string;
  body: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  user: {
    name: string;
  };
};

export type PostWithCommentFromDB = PostFromDB & {
  comments: Comment[];
};

export type UserFormLoginData = {
  username: string;
  password: string;
};
