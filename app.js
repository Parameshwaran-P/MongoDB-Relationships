const express = require('express')
const app =express()
const bodyparser= require('body-parser')
const exhbs = require('express-handlebars');
const dbo = require('./db');


app.engine('hbs',exhbs.engine({layoutsDir:'views/', defaultLayout:'main', extname:'hbs'}))
app.set('view engine', 'hbs')
app.set('views', 'views')
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.get('/',async (req, res)=>{
    let message='';
    try{
    let database = await dbo.getDatabase()
    const collection = database.collection('books');
    const curser = collection.find({})
    const books =await curser.toArray();

    switch (req.query.status) {
        case '1':
            message= 'Inserted Successfully!'
            break;
    
        default:
            break;
    }
    res.render(
        'main',{message,books}
    )
}
catch (error) {
    console.error('Failed to retrieve books:', error);
    res.status(500).send('Internal Server Error');
}
})

app.post('/store_book',async (req,res)=>{
    try {
    let database = await dbo.getDatabase()
    const collection = database.collection('books')
    let book = {title: req.body.title, author: req.body.author}
    await collection.insertOne(book)
    return res.redirect('/?status=1');}
    catch (error) {
        console.error('Failed to store book:', error);
        res.status(500).send('Internal Server Error');
    }
})
app.listen(8000,()=>{
    console.log('the port is running 8000 port');
})