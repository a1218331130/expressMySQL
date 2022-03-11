function uid() {
  const rnd = Math.floor(Math.random() * 1000)
  const timestamp = new Date().getTime()
  return [timestamp, rnd].join('')
}
// export function getMenuList(db, app) {}
const blogList = function blogList(db, app) {
  // 查询内容
  app.get('/blogApi/getlist', (req, res) => {
    let sql = 'SELECT * FROM blogList'
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.json(result)
      }
    })
  })
  app.get('/blogApi/getNewlist', (req, res) => {
    let sql = 'SELECT * FROM blogList limit 0,6'
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.json(result)
      }
    })
  })
  // 插入数据
  app.get('/blogApi/addlist', (req, res) => {
    let post = req.query
    post.id = uid()
    console.log(post, 'postpost')
    let sql = 'INSERT INTO blogList SET ?'
    db.query(sql, post, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send('post added....')
      }
    })
  })

  // 查询单条内容
  app.get('/blogApi/getlist/:parentId', (req, res) => {
    let sql = ''
    if (req.params.parentId && req.params.parentId !== '') {
      sql = `SELECT * FROM blogList WHERE ${req.params.parentId.length > 10 ? 'id' : 'parentId'} = "${req.params.parentId}"`
    } else {
      sql = 'SELECT * FROM blogList'
    }
    console.log(req.params.parentId.length, 'sqlsql')
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.json(result)
      }
    })
  })
  app.get('/blogApi/getlist/:id', (req, res) => {
    let sql = ''
    if (req.params.id && req.params.id !== '') {
      sql = `SELECT * FROM blogList WHERE id = "${req.params.id}"`
    } else {
      sql = 'SELECT * FROM blogList'
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
  app.post('/blogApi/updatelist', (req, res) => {
    let post = req.body
    const sqlData = `title = '${post.title}',author = '${post.author}',descstr = '${post.descstr}',tagList = '${post.tagList}',time = '${post.time}',contentList = '${post.contentList}',detailText = '${post.detailText}',compView = '${post.compView}',compCss = '${post.compCss}',compJavascript = '${post.compJavascript}'`
    // const sqlData = `title = '${post.title}',author = '${post.author}',descstr = '${post.descstr}',tagList = '${post.tagList}',time = '${post.time}',contentList = '${post.contentList}',detailText = '${post.detailText}',compView = '${post.compView}',compCss = '${post.compCss}',compJavascript = '${post.compJavascript}'`
    let sql = `UPDATE blogList SET ${sqlData} WHERE id = ${post.id}`
    // console.log(sql, 'sqlsql')
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.send(`update ${req.params.id} success....`)
      }
    })
  })

  // 删除内容
  app.get('/blogApi/deletlist/:id', (req, res) => {
    let sql = `DELETE FROM blogList WHERE id = ${req.params.id}`
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        console.log(result)
        res.send('删除成功.....')
      }
    })
  })

  // 统计总数
  app.get('/blogApi/listCount', (req, res) => {
    let sql = `select count(*) from blogList `
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err)
      } else {
        res.json(result)
      }
    })
  })
}
const listMethod = {
  blogList
}
module.exports = listMethod
