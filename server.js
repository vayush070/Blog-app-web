const express = require("express");
const DB = require("./config/db");
const path = require("path");
const app = express();
// const bodyParser = require("body-parser");

DB();

app.use(express.json({ extended: false }));
// app.use(bodyParser.json({ extended: true }));
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*"); // to enable calls from every domain
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "OPTIONS, GET, POST, PUT, PATCH, DELETE"
//   ); // allowed actiosn
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200); // to deal with chrome sending an extra options request
//   }
//   next();
// });
// app.get("/", (req, res) => {
//   res.send("API RUNNING .");
// });

app.use("/api/admin", require("./routes/api/Admin"));
app.use("/api/aauth", require("./routes/api/AAuth"));
app.use("/api/aregister", require("./routes/api/RegisterAdmin"));
app.use("/api/user", require("./routes/api/Users"));
app.use("/api/uauth", require("./routes/api/UAuth"));
app.use("/api/uregister", require("./routes/api/RegisterUser"));
app.use("/api/pblog", require("./routes/api/Blogs"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
