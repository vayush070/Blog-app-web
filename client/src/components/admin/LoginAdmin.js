import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { formActions, authActions, pageActions } from "../../store";
import axios from "axios";

const LoginAdmin = () => {
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
      // console.log(formData);
      const res = await axios.post("/api/admin", formData, config);
      if (res.status === 200) {
        dispatch(authActions.login());
        if (res.token) {
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
  // dispatch(formActions.setemail("vayush0"));
  return (
    <div>
      <h1>Admin logIn</h1>
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

export default LoginAdmin;
