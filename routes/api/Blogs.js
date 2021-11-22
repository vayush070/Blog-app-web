const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const User = require("../../models/Users");
const Blog = require("../../models/Blogs");

//post a blog
router.post(
  "/",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ msg: errors.array() });
    }

    try {
      // console.log("r1");
      const user = await User.findById(req.user.id).select("-password");
      // console.log("r1");
      const newBlog = new Blog({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });
      // console.log("r1");

      const blog = await newBlog.save();

      res.json(blog);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server error");
    }
  }
);

//get all post of logged-in user
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.find({ user: req.params.id });
    res.json(blog);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

//get all post
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

//delete a post by its id
router.delete("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    await blog.remove();

    res.json({ msg: "Blog removed" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

//make a blog verified
router.post("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    blog.verified = !blog.verified;
    await blog.save();

    res.status(200).json({ msg: "Verified" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
