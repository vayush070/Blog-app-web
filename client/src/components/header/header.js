import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions, formActions, pageActions } from "../../store/index";
import { Link } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const whichPage = useSelector((state) => state.page.page);

  const logoutHandler = () => {
    dispatch(authActions.logout());
    dispatch(formActions.setemail(""));
    dispatch(formActions.setpassword(""));
    dispatch(formActions.setname(""));
    axios.defaults.headers.common["x-auth-token"] = "";
  };
  const togglePageHandler = () => {
    dispatch(pageActions.togglePage());
    dispatch(authActions.logout());
    dispatch(formActions.setemail(""));
    dispatch(formActions.setpassword(""));
    dispatch(formActions.setname(""));
    axios.defaults.headers.common["x-auth-token"] = "";
  };
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light nav">
        <a class="navbar-brand navbar-and" href="#">
          <h1>Blogger</h1>
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav mr-auto">
            {whichPage == 2 ? (
              <li class="nav-item">
                <h3>
                  <a class="nav-link" href="#" onClick={togglePageHandler}>
                    Login to User
                  </a>
                </h3>
              </li>
            ) : (
              <li class="nav-item">
                <h3>
                  <a class="nav-link" href="#" onClick={togglePageHandler}>
                    Login to Admin
                  </a>
                </h3>
              </li>
            )}

            {!isAuth && (
              <li class="nav-item active">
                <a class="nav-link" href="#"></a>
              </li>
            )}
            {isAuth && (
              <li class="nav-item active">
                <button class="nav-link" href="#" onClick={logoutHandler}>
                  LogOut
                </button>
              </li>
            )}
          </ul>
          <span class="navbar-text ">- Platform for Content Writers</span>
        </div>
      </nav>
    </div>
  );
};

export default Header;
