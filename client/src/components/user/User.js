import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  formActions,
  authActions,
  userActions,
  blogActions,
  alertActions,
} from "../../store";
import "./User.css";

const User = () => {
  const [refresh, setrefresh] = useState(1);
  const u_id = useSelector((state) => state.form.curr_id);
  useEffect(() => {
    if (refresh) {
      const getblogs = async () => {
        const res = await axios.get("/api/pblog/" + u_id);
        dispatch(blogActions.updateBlogs(res.data));
      };
      getblogs();
    }
  }, [refresh]);
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs.blogs);
  const text = useSelector((state) => state.form.text);
  const textChangeHandler = (data) => {
    dispatch(formActions.settext(data.target.value));
  };
  const formData = {
    text,
  };
  const onSubmit = async (e) => {
    // dispatch(alertActions.updateAlert("Blog"));
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post("/api/pblog", formData, config);
      dispatch(
        alertActions.updateAlert("Send to admin, waiting for verification")
      );
      setTimeout(() => {
        dispatch(alertActions.updateAlert(""));
      }, 3000);
      // console.log(res);
      dispatch(blogActions.addblog(formData));
    } catch (error) {
      console.error(error.message);
    }
  };
  const Refresh = () => {
    setrefresh(refresh + 1);
  };
  const deleteBlogHandler = async (id) => {
    try {
      const res = await axios.delete("/api/pblog/" + id);
      dispatch(alertActions.updateAlert("Blog deleted"));
      setTimeout(() => {
        dispatch(alertActions.updateAlert(""));
      }, 3000);
      setrefresh(refresh + 1);
      // console.log(res);
    } catch (error) {}
  };
  // let username = blogs[0].name;
  return (
    <div>
      <div className="blog-cont">
        <div className="panel">User panel</div>
        <button onClick={() => Refresh()}>Refresh</button>
        <h1>Welcome user</h1>
        {blogs.map((blog) => {
          if (blog.verified) {
            return (
              <p>
                <p>
                  <p>
                    <b>Post: </b>
                  </p>
                  <p>{blog.text}</p>
                  <button onClick={() => deleteBlogHandler(blog._id)}>
                    delete
                  </button>
                </p>
              </p>
            );
          }
        })}
      </div>
      <div class="form1">
        <h1>Add Blog</h1>
        <form onSubmit={(e) => onSubmit(e)} class="form-cont">
          <div class="form-group">
            <label for="exampleInputName1">Text</label>
            <input
              onChange={(e) => textChangeHandler(e)}
              type="text"
              class="form-control"
              id="exampleInputName1"
              aria-describedby="nameHelp"
              placeholder="Enter Text"
              value={text}
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

export default User;
