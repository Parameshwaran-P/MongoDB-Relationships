// const mongodb = require('mongodb');
// const MongoClient = mongodb.MongoClient;

const mongoose = require('mongoose');
const OrderModel = require('./models/ordersmodel')
require('./models/productmodel');

(async () => {
    //Database Connection
    // let database;
    // database = await MongoClient.connect('mongodb://127.0.0.1:27017').then((client) => {
    //     database = client.db('shop');
    //     if (!database) {
    //         console.log('Database not connected');
    //     }else {
    //         console.log('Database connected');
    //     }
    //     return database;
    // });

    mongoose.connect('mongodb://127.0.0.1:27017/shop').then(() => {
        console.log('Database connected');
    }).catch(() => {
        console.log('Database not connected');
    })
    
    // const orders = await database.collection('orders').aggregate([
    //     {
    //         $lookup: {
    //             from: 'products',
    //             localField: 'product_id',
    //             foreignField: '_id',
    //             as: 'orderProducts'
    //         }
    //     }
    // ]).toArray()
    const orders = await OrderModel.find({}).populate(['product_id', 'customer_id'])
    console.log(orders);
    
    
})();


