const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // console.log(JSON.sqtringify(req.headers));
  const token = req.headers["x-auth-token"];
  // console.log(token);

  if (!token) {
    return res.status(401).json("No token, Unauthorised");
  }

  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json("Token is not valid");
  }
};
