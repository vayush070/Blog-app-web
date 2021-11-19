import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { formActions, authActions, pageActions } from "../../store";

const LoginUser = () => {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.form.email);
  const password = useSelector((state) => state.form.password);
  const emailChangeHandler = (data) => {
    dispatch(formActions.setemail(data.target.value));
  };
  const passwordChangeHandler = (data) => {
    dispatch(formActions.setpassword(data.target.value));
  };
  const formData = {
    email,
    password,
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post("/api/user", formData, config);
      // console.log(res.data.id);
      dispatch(formActions.setid(res.data.iid));
      if (res.status === 200) {
        dispatch(authActions.login());
        if (res.data.token) {
          // console.log("khad");
          axios.defaults.headers.common["x-auth-token"] = res.data.token;
          localStorage.setItem("jwtToken", res.data.token);
        } else {
          delete axios.defaults.headers.common["x-auth-token"];
        }
        // dispatch(pageActions.togglePage());
      } else {
        console.log("something is wrong");
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div>
      <h1>User logIn</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            onChange={(e) => emailChangeHandler(e)}
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={email}
          />
          <small id="emailHelp" class="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            onChange={(e) => passwordChangeHandler(e)}
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            value={password}
          />
        </div>

        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default LoginUser;
