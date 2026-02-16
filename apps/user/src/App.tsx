import { Outlet } from "react-router";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Main from "./components/Main";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("Authorization Error.");
  }

  return (
    <>
      <Header>
        <NavBar auth={auth} />
      </Header>
      <Main>
        <Outlet />
      </Main>
    </>
  );
}

export default App;
