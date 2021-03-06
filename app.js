const express = require('express')
const handlebars = require('express-handlebars')
const flash = require('connect-flash')
const session = require('express-session')

const methodOverride = require('method-override')

const db = require('./models') // 引入資料庫
const bodyParser = require('body-parser') // for http POST, req.body 

const app = express()
const port = process.env.PORT || 3000

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}


const passport = require('./config/passport')


app.use(methodOverride('_method'))

app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }))
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())

// 把 req.flash 放到 res.locals 裡面(這樣就不用每一個 controller 都要設定 flash messages)
app.use((req, res, next) => {
  res.locals.success_messages = req.flash('success_messages')
  res.locals.error_messages = req.flash('error_messages')
  res.locals.user = req.user
  next()
})

app.use('/upload', express.static(__dirname + '/upload'))

app.engine('handlebars', handlebars({
  defaultLayout: 'main',
  helpers: require('./config/handlebars-helpers.js')
})) //handlebars v3.1.0 優化中已直接帶入，故可不寫

app.set('view engine', 'handlebars')
app.use(bodyParser.urlencoded({ extended: true }))// for http POST, req.body //app.use: 所有的請求都會先被 bodyParser 進行處理
app.use(bodyParser.json())

app.listen(port, () => {
  // console.log("example app listen on port:" + port)
  db.sequelize.sync() // 跟資料庫同步
  console.log(`restaurant_forum app listen on port: ${port}`)
})

// 引入 routes 並將 app 傳進去，讓 routes 可以用 app 這個物件來指定路由
require('./routes')(app) //需要放在 app.js 的最後一行