const express = require('express')
const app =express()
const bodyparser= require('body-parser')
const exhbs = require('express-handlebars');
const dbo = require('./db');


app.engine('hbs',exhbs.engine({layoutsDir:'views/', defaultLayout:'main', extname:'hbs'}))
app.set('view engine', 'hbs')
app.set('views', 'views')

app.get('/',async (req, res)=>{
    let message='test'
    let database =await dbo.getDatabase()
    const collection = database.collection()
    res.render(
        'main',{message}
    )
})
app.listen(8000,()=>{
    console.log('the port is running 8000 port');
})