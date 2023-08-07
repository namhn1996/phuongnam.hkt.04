const myslq2 = require("mysql2");

// khoi tao
const connect = myslq2.createPool({
  database: "datahkt",
  port: 3306,
  host: "localhost",
  user: "root",
  password: "",
});
// check
connect.getConnection((err, connection) => {
  if (err) {
    console.log("Kết nối thất bại ", err);
  } else {
    console.log("Kết nối thành công");
  }
});
module.exports = connect.promise();
