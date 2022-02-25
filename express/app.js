const express = require('express')
const app = express()
const mysql = require('mysql')
const menuMethod = require('./sql/menu')
const listMethod = require('./sql/list')

var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: '3306',
  password: '123456',
  database: 'nodemysql'
})

db.connect((err) => {
  if (err) {
    console.log(err, '连接失败')
  } else {
    console.log('连接成功')
  }
})
menuMethod.getRoutes(db, app)
listMethod.blogList(db, app)

// var sql = "SELECT * FROM websites";
//查
// connection.query(sql, function (err, result) {
//   if (err) {
//     console.log("[SELECT ERROR] - ", err.message);
//     return;
//   }

//   console.log("--------------------------SELECT----------------------------");
//   console.log(result);
//   console.log(
//     "------------------------------------------------------------\n\n"
//   );
// });

// connection.end();
app.listen(3000, () => {
  console.log('开启服务器')
})
