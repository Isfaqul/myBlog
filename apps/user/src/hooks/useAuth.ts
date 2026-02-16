import { useEffect, useState } from "react";
import { clearToken, getToken, setToken } from "../utils/token";
import { BASE_API_URL } from "../config/env";

export default function useAuth() {
  const [accessToken, setAccessToken] = useState<string | null>(() => getToken());
  const [isLoggedIn, setIsloggedIn] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      if (!accessToken) {
        setIsloggedIn(false);
        return;
      }

      try {
        const response = await fetch(`${BASE_API_URL}/auth/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        // If response is anything other than 200
        if (!response.ok) {
          clearToken();
          setAccessToken(null);
          setIsloggedIn(false);
          return;
        }

        setIsloggedIn(true);
      } catch (error) {
        setIsloggedIn(false);
      }
    };

    validateToken();
  }, [accessToken]);

  const logIn = (token: string) => {
    setToken(token);
    setAccessToken(token);
  };

  const logOut = () => {
    clearToken();
    setAccessToken(null);
  };

  return { logIn, logOut, isLoggedIn, accessToken };
}
