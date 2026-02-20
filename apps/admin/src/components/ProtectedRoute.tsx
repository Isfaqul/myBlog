import { type ReactNode } from "react";
import useAuthContext from "../hooks/useAuthContext";
import { Navigate } from "react-router";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const auth = useAuthContext();

  if (auth.isLoggedIn) {
    return <>{children}</>;
  }
  return <Navigate to={"/auth/login"} replace />;
}

export default ProtectedRoute;
