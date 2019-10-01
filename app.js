const express = require('express')
const handlebars = require('express-handlebars')
const db = require('./models') // 引入資料庫
const app = express()
const port = 3000

app.engine('handlebars', handlebars({ defaultLayout: 'main' })) //handlebars v3.1.0 優化中已直接帶入，故可不寫
app.set('view engine', 'handlebars')


app.listen(port, () => {
  // console.log("example app listen on port:" + port)
  db.sequelize.sync() // 跟資料庫同步
  console.log(`example app listen on portxx: ${port}`)
})

// 引入 routes 並將 app 傳進去，讓 routes 可以用 app 這個物件來指定路由
require('./routes')(app) //需要放在 app.js 的最後一行


const exphbs = require('express-handlebars')