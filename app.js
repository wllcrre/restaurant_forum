const express = require('express')
const handelebars = require('express-handlebars')
const app = express()
const port = 3000

app.engine('handlebars', handelebars())
app.set('view engine', 'handlebars')


app.listen(port, () => {
  // console.log("example app listen on port:" + port)
  console.log(`example app listen on portxx: ${port}`)
})