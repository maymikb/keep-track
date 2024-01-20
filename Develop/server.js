const express = require ("express");
const PORT = 3001
const app =express()
const fs = require("fs")
const path =require("path")

// middlewares
app.use(express.static("public"))

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.get("/", function(req,res){

    res.sendFile(path.join(__dirname, "/public/index.html"))
})

app.get("/notes", function(req,res){

    res.sendFile(path.join(__dirname, "/public/notes.html"))
})

app.get("/api/notes", function(req,res){

    res.sendFile(path.join(__dirname, "/db/db.json"))
})

app.post("/api/notes", function(req,res){
    console.log(req.body)

    const newNote = {
        title: req.body.title,
        text: req.body.text
    }

    fs.readFile("./db/db.json", "utf-8", function(err, data) {
        const notes = JSON.parse(data);

        notes.push(newNote);

        fs.writeFile("./db/db.json", JSON.stringify(notes, null, 4), function() {
            console.log("Updated db.json!")

            res.send("Added new note!")
        })

    })
    
})




app.listen (PORT, function(){
    console.log("server is running")
})





