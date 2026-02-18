import { Outlet } from "react-router";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Main from "./components/Main";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Footer from "./components/Footer";

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
      <Footer></Footer>
    </>
  );
}

export default App;
