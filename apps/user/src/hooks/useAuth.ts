import { useState } from "react";
import { clearToken, getToken, setToken } from "../utils/token";

export default function useAuth() {
  const [accessToken, setAccessToken] = useState<string | null>(() => getToken());

  const logIn = (token: string) => {
    setToken(token);
    setAccessToken(token);
  };

  const logOut = () => {
    clearToken();
    setAccessToken(null);
  };

  const isLoggedIn = typeof accessToken === "string" && accessToken.length > 10;

  return { logIn, logOut, isLoggedIn, accessToken };
}
