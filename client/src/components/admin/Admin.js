import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Admin.css";
import { useDispatch, useSelector } from "react-redux";
import {
  formActions,
  authActions,
  userActions,
  blogActions,
} from "../../store";

const Admin = () => {
  const [refresh, setrefresh] = useState(1);
  useEffect(() => {
    if (refresh) {
      const getusers = async () => {
        const res1 = await axios.get("/api/user");
        // const res2 = await axios.get("/api/pblog");
        dispatch(userActions.updateusers(res1.data));
        // dispatch(blogActions.updateBlogs(res2.data));
      };
      getusers();
      const getallblogs = async () => {
        const res2 = await axios.get("/api/pblog");
        dispatch(blogActions.updateBlogs(res2.data));
      };
      getallblogs();
    }
  }, [refresh]);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const allblogs = useSelector((state) => state.blogs.blogs);
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
    status: true,
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
      // console.log(res);
      dispatch(userActions.adduser(formData));
    } catch (error) {}
  };

  const verifyHandler = async (id) => {
    // console.log(id);
    try {
      const res = await axios.post("/api/pblog/" + id);
      setrefresh(refresh + 1);
      // console.log(res);
    } catch (error) {}
  };
  const deletePostHandler = async (id) => {
    try {
      const res = await axios.delete("/api/pblog/" + id);
      setrefresh(refresh + 1);
      // console.log(res);
    } catch (error) {}
  };
  const deleteUserHandler = async (id) => {
    try {
      const res = await axios.delete("/api/user/" + id);
      setrefresh(refresh + 1);
      // console.log(res);
    } catch (error) {}
  };
  const softDeleteUserHandler = async (id) => {
    try {
      const res = await axios.delete("/api/user/soft/" + id);
      setrefresh(refresh + 1);
    } catch (error) {}
  };
  const Refresh = () => {
    setrefresh(refresh + 1);
  };

  // console.log(users);
  return (
    <div>
      <div className="panel">Admin panel</div>
      <button onClick={() => Refresh()}>Refresh</button>
      <div className="container-a">
        <div class="user-cont">
          <h1 className="my-4">All users</h1>
          {users.map((user) => (
            <p>
              <p>
                <b>Username</b>: <p>{user.name}</p>
              </p>
              <p>
                <b>Email</b>: <p>{user.email}</p>
              </p>
              <p>
                {user.status ? (
                  <button onClick={() => softDeleteUserHandler(user._id)}>
                    Soft Delete
                  </button>
                ) : (
                  <button onClick={() => softDeleteUserHandler(user._id)}>
                    Activate Account
                  </button>
                )}

                <button onClick={() => deleteUserHandler(user._id)}>
                  Remove account
                </button>
              </p>
            </p>
          ))}
        </div>
        <div class="user-cont">
          <h1 className="my-4">All blogs</h1>
          {allblogs.map((blog) => (
            <p>
              <p>
                <b>Text</b>: <p>{blog.text}</p>
              </p>
              <p>
                <b>Username</b>: <p>{blog.name}</p>
              </p>
              <p>
                {blog.verified ? (
                  <p>
                    <p className="green-tick">verified</p>
                    <button onClick={() => verifyHandler(blog._id)}>
                      Disprove
                    </button>
                  </p>
                ) : (
                  <button onClick={() => verifyHandler(blog._id)}>
                    Verify
                  </button>
                )}
                <button onClick={() => deletePostHandler(blog._id)}>
                  Delete
                </button>
              </p>
            </p>
          ))}
        </div>
      </div>
      <div class="form1">
        <h1>Add User</h1>
        <form onSubmit={(e) => onSubmit(e)} class="form-cont">
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
