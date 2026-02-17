export type User = {
  id: number;
  name: string;
  username: string;
  password: string;
  color: string;
  role: "USER" | "ADMIN";
  createdAt: string;
  updatedAt: string;
};

export type UserOnRequestObj = {
  id: number;
  name: string;
  username: string;
  role: "USER" | "ADMIN";
};
