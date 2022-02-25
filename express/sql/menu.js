function uid() {
  const rnd = Math.floor(Math.random() * 1000)
  const timestamp = new Date().getTime()
  return [timestamp, rnd].join('')
}
// export function getMenuList(db, app) {}
const getRoutes = function getRoutes(db, app) {
  // 查询菜单路由
  app.get('/blogApi/menu/routesByMenuCode', (req, res) => {
    let sql = 'SELECT * FROM menuRouter'
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        console.log(result)
        res.json({
          code: 200,
          data: result,
          msg: '操作成功',
          success: true
        })
      }
    })
  })
  // 查询内容
  app.get('/blogApi/getpost', (req, res) => {
    let sql = 'SELECT * FROM blogHeader'
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.json(result)
      }
    })
  })
  // 插入数据
  app.get('/blogApi/addpost', (req, res) => {
    let post = req.query
    post.id = uid()
    console.log(post, 'postpost')
    let sql = 'INSERT INTO blogHeader SET ?'
    db.query(sql, post, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send('post added....')
      }
    })
  })

  // 查询单条内容
  app.get('/blogApi/getpost/:name', (req, res) => {
    let sql = ''
    if (req.params.name && req.params.name !== '') {
      sql = `SELECT * FROM blogHeader WHERE name = "${req.params.name}"`
    } else {
      sql = 'SELECT * FROM blogHeader'
    }
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.json(result)
      }
    })
  })
  // 更新内容
  app.get('/blogApi/updatepost/:id', (req, res) => {
    let post = req.query
    const sqlData = `name = '${post.name}',descp = '${post.descp}',bg = '${post.bg}',url = '${post.url}',config = '${post.config}',sort = '${post.sort}'`
    let sql = `UPDATE blogHeader SET ${sqlData} WHERE id = ${req.params.id}`
    console.log(sql, 'sqlsql')
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(`update ${req.params.id} success....`)
      }
    })
  })

  // 删除内容
  app.get('/blogApi/deletepost/:id', (req, res) => {
    let sql = `DELETE FROM blogHeader WHERE id = ${req.params.id}`
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        console.log(result)
        res.send('删除成功.....')
      }
    })
  })
}
const menuMethod = {
  getRoutes
}
module.exports = menuMethod
