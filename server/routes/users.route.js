const express = require("express");
const connect = require("../connect/connectMysql");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = express.Router();

userRoute.use(bodyParser.json());
userRoute.use(bodyParser.urlencoded({ extended: true }));
userRoute.use(cors());

// Thêm người dùng
userRoute.post("/", async (req, res) => {
  const { name, description } = req.body;
  try {
    let result = await connect.execute(
      "INSERT INTO users (name,description) VALUES(?,?)",
      [name, description]
    );
    if (result.affectedRows > 0) {
      res.send("Thêm thành công");
    }
  } catch (error) {
    console.log("Lỗi rồi", error);
  }
});

// Lấy all người dùng
userRoute.get("/", async (req, res) => {
  try {
    const users = await connect.execute("SELECT * FROM users");
    if (users[0].length > 0) {
      res.send(users[0]);
    }
  } catch (error) {
    console.log("Lỗi rồi", error);
  }
});

// Lấy 1 người dùng
userRoute.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const users = await connect.execute(
      "SELECT * FROM users WHERE user_id = ?",
      [id]
    );
    if (users[0].length > 0) {
      res.send(users[0]);
    }
  } catch (error) {
    console.log("Lỗi rồi", error);
  }
});

// Xoa nguoi dung
userRoute.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await connect.execute("DELETE FROM users WHERE user_id = ?", [id]);
    res.json("Xóa thành công");
  } catch (error) {
    console.log("Lỗi rồi", error);
  }
});

// Cap nhat du lieu
userRoute.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const result = connect.execute(
      "UPDATE users SET name = ?, description = ? WHERE user_id = ?",
      [name, description, id]
    );
    if (result > 0) {
      res.json("Cập nhật thành công");
    }
  } catch (error) {
    console.log("Lỗi rồi", error);
  }
});

module.exports = userRoute;
