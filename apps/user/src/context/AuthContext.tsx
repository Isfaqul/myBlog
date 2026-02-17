import { createContext } from "react";
import useAuth from "../hooks/useAuth";

export type AuthContextType = ReturnType<typeof useAuth> | null;

type AuthProviderType = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextType>(null);

function AuthProvider({ children }: AuthProviderType) {
  const auth = useAuth();

  return <AuthContext value={auth}>{children}</AuthContext>;
}

export default AuthProvider;
