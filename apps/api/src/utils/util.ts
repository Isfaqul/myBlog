import bcrypt from "bcryptjs";

const hashPassword = (password: string) => {
  const SALT = 10;
  return bcrypt.hashSync(password, SALT);
};

const comparePassword = (password: string, hash: string) => {
  return bcrypt.compareSync(password, hash);
};

const getSlug = (title: string) => {
  return title.trim().toLowerCase().split(" ").join("-");
};

export { hashPassword, comparePassword, getSlug };
