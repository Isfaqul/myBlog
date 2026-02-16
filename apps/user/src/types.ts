export type BlogPost = {
  id: number;
  title: string;
  body: string;
  published: boolean;
  userId: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  user: {
    name: string;
  };
  comments?: Comment[];
};

export type BlogCardProps = {
  blog: BlogPost;
};

export type BlogAuthorRowProps = {
  user: string;
  publishDate: string;
};

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type SizeClasses = "text-sm" | "text-md" | "text-lg" | "text-xl" | "text-2xl" | "text-3xl" | "text-4xl";

export type HeadingProps = {
  level: HeadingLevel;
  size?: SizeClasses;
} & React.ComponentPropsWithoutRef<"h1">;

export type MainProps = React.ComponentPropsWithoutRef<"main">;

export type CommentCardProps = {
  comment: Comment;
};

export type MainContentWrapperProps = {} & React.ComponentPropsWithoutRef<"div">;
export type HeaderProps = {} & React.ComponentPropsWithoutRef<"header">;

export type Comment = {
  id: number;
  comment: string;
  authorId: number;
  createdAt: string; // ISO Date string
  user: {
    name: string;
  };
};

export type SignUpFormData = {
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
};

export type FormDataApiError = {
  type: string;
  value: string;
  message: string;
  path: string;
  location: string;
};

export type LogInFormData = {
  username: string;
  password: string;
};

export type AboutResponse = {
  aboutMe: string;
  aboutThisPage: string;
};
