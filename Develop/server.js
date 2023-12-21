const express = require ("express");
const PORT = 3001
const app =express()
const path =require("path")


app.get("/", function(req,res){

    res.sendFile(path.join(__dirname, "/public/index.html"))
})






app.listen (PORT, function(){
    console.log("server is running")
})





