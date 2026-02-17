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

const getRandomTailwindBgColor = () => {
  const colorCode = [300, 400, 500, 600, 800, 900, 950];
  const colorName = [
    "red",
    "orange",
    "amber",
    "yellow",
    "lime",
    "green",
    "emerald",
    "teal",
    "cyan",
    "sky",
    "blue",
    "idigo",
    "violet",
    "purple",
    "fuchsia",
    "pink",
    "rose",
    "slate",
    "gray",
    "stone",
  ];

  const randCodeIndex = Math.floor(Math.random() * colorCode.length);
  const randNameIndex = Math.floor(Math.random() * colorName.length);

  return `bg-${colorName[randNameIndex]}-${colorCode[randCodeIndex]}`;
};

export { hashPassword, comparePassword, getSlug, getRandomTailwindBgColor };
