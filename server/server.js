const express = require("express");
const app = express();
const userRoute = require("./routes/users.route");

app.use("/users", userRoute);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
