const express = require('express')
const app =express()
const bodyparser= require('body-parser')
const exhbs = require('express-handlebars');
const dbo = require('./db');


app.engine('hbs',exhbs.engine({layoutsDir:'views/', defaultLayout:'main', extname:'hbs'}))
app.set('view engine', 'hbs')
app.set('views', 'views')

app.get('/',async (req, res)=>{
    let message=''
    let database = await dbo.getDatabase()
    const collection = database.collection('books');
    const curser = collection.find({})
    const employees =await curser.toArray();
    res.render(
        'main',{message,employees}
    )
})
app.listen(8000,()=>{
    console.log('the port is running 8000 port');
})