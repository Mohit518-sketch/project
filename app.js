const express=require('express');
const app=express();
const mongoose=require('mongoose');
const MONGO_URL='mongodb://127.0.0.1:27017/air';
const Listing=require("./models/listings.js");

app.get('/',(req,res)=>{
    res.send("Hello World");
});

main().then(()=>{
    console.log("data is coonected");
}).catch((err)=>{
    console.log("check again",err)
});


async function main(){
    await mongoose.connect(MONGO_URL);
}

app.get("/testListing",async (req,res)=>{
    let sampleListing=new Listing({
        title:"Sample Title",
        description:"This is a sample description", 
        image:"",
        price:100,
        location:"Sample Location",
        country:"Sample Country"
    });
     await sampleListing.save();
    console.log("sample was saved"
    );
    res.send("scucessful");
});

app.listen(8080,()=>{
    console.log("Server is running on port 8080");
})