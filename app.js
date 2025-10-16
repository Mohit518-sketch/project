const express = require('express');
const app = express();
const mongoose = require('mongoose');
const MONGO_URL = 'mongodb://127.0.0.1:27017/air';
const Listing = require("./models/listings.js");
const path = require('path');
const { url } = require('inspector');
const methodOverride = require('method-override');
const ejsmate = require('ejs-mate');
const wrapasync = require('./utils/wrapasync.js');

app.engine("ejs", ejsmate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send("Hello World");
});

main().then(() => {
    console.log("data is coonected");
}).catch((err) => {
    console.log("check again", err)
});


async function main() {
    await mongoose.connect(MONGO_URL);
}

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.get('/home', (req, res) => {
    res.send("This is home page");
});




// index route
app.get("/listings", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
})

// // new route
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});

// show route
app.get("/listings/:id", async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
});

// create route
app.post("/listings", wrapasync(async (req, res) => {
        const newlisting = new Listing(req.body.listing);
        await newlisting.save();
        res.redirect("/listings");
})
);


// edit route
app.get("/listings/:id/edit", async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
});

// update route
app.put("/listings/:id", async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect("/listings");
});

// delete route
app.delete("/listings/:id", async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings");
});

// app.get("/testListing",async (req,res)=>{
//     let sampleListing=new Listing({
//         title:"Sample Title",
//         description:"This is a sample description", 
//         image:"",
//         price:100,
//         location:"Sample Location",
//         country:"Sample Country"
//     });
//      await sampleListing.save();
//     console.log("sample was saved"
//     );
//     res.send("scucessful");
// });

app.use((err, req, res, next) => {
    res.send("Something went wrong");
});

app.listen(8080, () => {
    console.log("Server is running on port 8080");
})