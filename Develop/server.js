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

app.delete("/api/notes/:id", function(req,res){
    let id=req.params.id
    console.log('in delete, id is: ', id, 'type of id: ', typeof id)
    fs.readFile("./db/db.json", "utf-8", function(err, data) {
        const notes = JSON.parse(data);
        console.log('length: ', notes.length)
        console.log('notes: ', notes)
        let indexOfNoteToDelete = notes.findIndex(e=> e.id.toString() === id)

        notes.splice(indexOfNoteToDelete, 1);

        console.log('index to delete: ', indexOfNoteToDelete)

        fs.writeFile("./db/db.json", JSON.stringify(notes, null, 4), function() {
            console.log("Updated db.json!")

            res.send("Deleted note at index "+indexOfNoteToDelete+"!!!")
        })
    })

    // console.log(path.join(__dirname, "/db/db.json"))
    // fs.unlink(path.join(__dirname, "/db/db.json"), function(){
    //     console.log("") // Callback
    // });
})

app.post("/api/notes", function(req,res){
    console.log(req.body)

    

    fs.readFile("./db/db.json", "utf-8", function(err, data) {
        const notes = JSON.parse(data);
        let newId = 1;
        let idExists = () => notes.some(e=>e.id === newId)
        while(idExists()){
            newId++
        }
        console.log('new Id: ', newId)
        const newNote = {
            title: req.body.title,
            text: req.body.text,
            id: newId
        }

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









