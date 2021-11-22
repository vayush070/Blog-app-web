const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/Users");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

router.get("/", async (req, res) => {
  try {
    let users = await User.find();
    if (!users) {
      // console.log("found error")
      return res.status(400).json({ errors: [{ msg: "No users" }] });
    }
    res.send(users);
  } catch (error) {}
});
router.delete("/:id", async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    await user.remove();
    res.send(user);
  } catch (error) {}
});
router.delete("/soft/:id", async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    user.status = !user.status;
    await user.save();
    res.send(user);
  } catch (error) {}
});
router.post(
  "/",
  [
    check("email", "Please include a valid Email").isEmail(),
    check("password", "Please is required").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user || !user.status) {
        // console.log("found error")
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const payload = {
        user: {
          id: user.id,
        },
      };
      // console.log(user.id);
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (error, token) => {
          if (error) throw error;
          res.json({ token, iid: user.id });
        }
      );

      // res.send('user registered');
    } catch (error) {
      console.error(error.message);
      res.status(500).send("server error");
    }
  }
);

module.exports = router;
