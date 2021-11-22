import "./App.css";
import Header from "./components/header/header";
import { useDispatch, useSelector } from "react-redux";
import LoginAdmin from "./components/admin/LoginAdmin";
import LoginUser from "./components/user/LoginUser";
import Admin from "./components/admin/Admin";
import User from "./components/user/User";
import Alert from "./components/Alert/Alert";

function App() {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const whichPage = useSelector((state) => state.page.page);
  return (
    <div className="App">
      <Header />
      <Alert />
      {isAuth ? (
        whichPage === 1 ? (
          <User />
        ) : (
          <Admin />
        )
      ) : whichPage === 1 ? (
        <LoginUser />
      ) : (
        <LoginAdmin />
      )}
    </div>
  );
}

export default App;
