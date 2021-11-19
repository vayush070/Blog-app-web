import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  formActions,
  authActions,
  userActions,
  blogActions,
} from "../../store";

const User = () => {
  const u_id = useSelector((state) => state.form.curr_id);
  useEffect(() => {
    const getblogs = async () => {
      const res = await axios.get("/api/pblog/" + u_id);
      dispatch(blogActions.updateBlogs(res.data));
    };
    getblogs();
  }, []);
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
    e.preventDefault();

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post("/api/pblog", formData, config);
      console.log(res);
      dispatch(blogActions.addblog(formData));
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div>
      <h1>Your Blogs</h1>
      {blogs.map((blog) => (
        <div>
          <p>{blog.text}</p>
        </div>
      ))}
      <div>
        <h1>Add Blog</h1>
        <form onSubmit={(e) => onSubmit(e)}>
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
