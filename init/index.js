const mongoose=require('mongoose');
const Listing=require("../models/listings.js");

const initData=require("./data.js");
const MONGO_URL="mongodb://127.0.0.1:27017/air";

main().then(()=>{
    console.log("data is connected");
}).catch((err)=>{
    console.log("check again",err)
});
async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB=async()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("data is inserted");
};

initDB();