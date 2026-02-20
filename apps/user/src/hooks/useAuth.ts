import { useEffect, useState } from "react";
import { clearToken, getToken, setToken } from "../utils/token";
import { BASE_API_URL } from "../config/env";
import { jwtDecode } from "jwt-decode";

type JwtPayload = {
  sub: { id: number; name: string; color: string };
  iat: number;
  exp: number;
};

export default function useAuth() {
  const [accessToken, setAccessToken] = useState<string | null>(() => getToken());
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsloggedIn] = useState(false);
  const [user, setUser] = useState<{ id: number; name: string; color: string } | null>(null);

  useEffect(() => {
    const validateToken = async () => {
      if (!accessToken) {
        setIsloggedIn(false);
        setUser(null);
        return;
      }

      setLoading(true);

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
          setUser(null);
          setIsloggedIn(false);
          return;
        }

        const decoded = jwtDecode<JwtPayload>(accessToken);
        setUser(decoded.sub);
        setIsloggedIn(true);
      } catch (error) {
        setAccessToken(null);
        setUser(null);
        setIsloggedIn(false);
      } finally {
        setLoading(false);
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
    setUser(null);
    setAccessToken(null);
  };

  return { logIn, logOut, isLoggedIn, accessToken, user, loading };
}
