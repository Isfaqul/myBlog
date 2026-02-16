import { Outlet } from "react-router";
import Main from "../components/Main";

export default function AuthLayout() {
  return (
    <>
      <Main>
        <Outlet />
      </Main>
    </>
  );
}
