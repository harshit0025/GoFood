const mongoose = require('mongoose')
const mongoURI = 'mongodb+srv://harshityadav0025:3grxUW2fjRZ9BBoj@cluster0.cujl2bj.mongodb.net/GoFoodData?retryWrites=true&w=majority&appName=Cluster0'
// const mongoURI = 'mongodb://harshityadav0025:3grxUW2fjRZ9BBoj@ac-gdwteji-shard-00-00.cujl2bj.mongodb.net:27017,ac-gdwteji-shard-00-01.cujl2bj.mongodb.net:27017,ac-gdwteji-shard-00-02.cujl2bj.mongodb.net:27017/GoFoodData?ssl=true&replicaSet=atlas-2zqznl-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0'


const connectDB = async () => {
    try{
        await mongoose.connect(mongoURI);
        console.log("DB connection established");

        // const fetchedData = await mongoose.connection.db.collection("food_items");
        // let data = await fetchedData.find({}).toArray();
        // console.log(data);


    }catch(err){
        console.log("MongoDB connection error: " + err.message);
        process.exit(1);
    }
    
}


// connectDB().catch(err => console.log(err));

module.exports = connectDB;
