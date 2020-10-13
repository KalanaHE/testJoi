const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/mongooseTest", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
mongoose.connection
  .once("open", () => {
    console.log("MongoDB Connected!");
  })
  .on("error", (error) => {
    console.log("error: " + error);
  });
