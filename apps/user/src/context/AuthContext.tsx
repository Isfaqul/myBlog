import { createContext } from "react";
import useAuth from "../hooks/useAuth";

export type AuthContexType = ReturnType<typeof useAuth> | null;

type AuthProviderType = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContexType>(null);

function AuthProvider({ children }: AuthProviderType) {
  const auth = useAuth();

  return <AuthContext value={auth}>{children}</AuthContext>;
}

export default AuthProvider;
