const TOKEN_NAME = "accessToken";

export const setToken = (token: string) => {
  localStorage.setItem(TOKEN_NAME, token);
};

export const clearToken = () => {
  localStorage.removeItem(TOKEN_NAME);
};

export const getToken = () => {
  const token = localStorage.getItem(TOKEN_NAME);
  return token;
};
