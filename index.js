const express = require("express");
const app = express();

app.use(express.json());

//Routes
const usersRoute = require("./routes/users");

app.use("/users", usersRoute);

app.listen(4000, () => {
  console.log("Server running at port 4000");
});
