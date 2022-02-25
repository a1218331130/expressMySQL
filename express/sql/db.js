app.get('/createDb', (req, res) => {
  let sql = 'CREATE DATABASE nodemysql'
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err, 'errerr')
    } else {
      console.log(result, 'createDbcreateDb')
      res.send('创建数据库成功')
    }
  })
})
app.get('/deleteDb', (req, res) => {
  let sql = 'drop database testsql'
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err, 'errerr')
    } else {
      console.log(result, 'deleteDbdeleteDb')
      res.send('删除数据库成功')
    }
  })
})
//  创建表
app.get('/createpoststable', (req, res) => {
  //  创建表 表名为posts id自增 title字符串长度255 body字符串255 主键是ID
  let sql = 'CREATE TABLE tableItem(id int AUTO_INCREMENT,title VARCHAR(255),body VARCHAR(255),PRIMARY KEY(ID))'
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      console.log(result)
      res.send('posts表创建成功....')
    }
  })
})
