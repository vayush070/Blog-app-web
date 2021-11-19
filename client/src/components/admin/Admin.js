import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { formActions, authActions, userActions } from "../../store";

const Admin = () => {
  useEffect(() => {
    const getusers = async () => {
      const res = await axios.get("/api/user");
      dispatch(userActions.updateusers(res.data));
    };
    getusers();
  }, []);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const name = useSelector((state) => state.form.name);
  const email = useSelector((state) => state.form.email);
  const password = useSelector((state) => state.form.password);
  const emailChangeHandler = (data) => {
    dispatch(formActions.setemail(data.target.value));
  };
  const passwordChangeHandler = (data) => {
    dispatch(formActions.setpassword(data.target.value));
  };
  const nameChangeHandler = (data) => {
    dispatch(formActions.setname(data.target.value));
  };
  const formData = {
    name,
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
      const res = await axios.post("/api/uregister", formData, config);
      console.log(res);
      dispatch(userActions.adduser(formData));
    } catch (error) {}
  };

  // console.log(users);
  return (
    <div>
      <h1>All users</h1>
      {users.map((user) => (
        <div>
          <p>
            {user.name}
            {user.email}
          </p>
        </div>
      ))}
      <div>
        <h1>Add User</h1>
        <form onSubmit={(e) => onSubmit(e)}>
          <div class="form-group">
            <label for="exampleInputEmail1">UserName</label>
            <input
              onChange={(e) => nameChangeHandler(e)}
              type="text"
              class="form-control"
              id="exampleInputName1"
              aria-describedby="nameHelp"
              placeholder="Enter Name"
              value={name}
            />
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
    </div>
  );
};

export default Admin;
