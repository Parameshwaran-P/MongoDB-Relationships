const mongodb = require('mongodb')
const mongoClient = mongodb.MongoClient;

(async ()=>{
    let database;
        database =await mongoClient.connect('mongodb://127.0.0.1:27017').then((client)=>{
        database = client.db('shop');
        if(!database){
            console.log('Database not connected');
        }
        else{
            console.log('Database connected');
        }
        return database;
    
    })
    database.collection()

})();

