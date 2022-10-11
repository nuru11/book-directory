const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const expressLayout = require("express-ejs-layouts")
const fromSchema = require("./model/schema")
const mongoose = require("mongoose")
 
app.use(expressLayout)
app.set("layout", "./layout/main")

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));



// get all the items
app.get("/", (req,res)=>{
    res.render("newBook")
})

// home page
app.get("/home", async(req,res)=>{
   // let searchInput = document.getElementById("search-input")
   

    fromSchema.find().then((result)=>{
         let searchOptions;
         let showNameOnly;
        if(req.query.namee != null || req.query.namee !== ""){
           searchOptions = result.filter(match => match.name == req.query.namee)
         showNameOnly = searchOptions.map(item => item.name)
           console.log(showNameOnly)
           
           if(searchOptions == ''){
            showNameOnly = "no name match"
           }
        }


        let extractName = result.map((item)=> item.name)
        let extractID = result.map(item => item._id)
        console.log(typeof extractID)
        res.render("home", {ffromSchema: extractName, result: result, extractName: extractName, searchOptions: showNameOnly, idFromSchema: result})
    }).catch((err)=>{
        console.log(err)
    })
    
})

// get spesific item
app.get("/newBook", (req,res)=>{
    res.render("newBook")
})

// create item 
app.post("/home", (req,res)=>{
    const Fschema = new fromSchema(req.body)

    Fschema.save().then((result)=>{
       console.log(result)
       res.redirect("/home")
    }).catch((err)=>{
        console.log(err)
    })
})

app.delete("/home", (req, res)=>{
    
})
mongoose.connect("mongodb+srv://nuru:12345@cluster0.f92keez.mongodb.net/?retryWrites=true&w=majority")
.then((result)=>{
    console.log("working")
}).catch((err)=>{
    console.log(err)
})

console.log("working")
app.listen(3000)