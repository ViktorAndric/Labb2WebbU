const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors")
const axios = require("axios");
app.use(express.json());
app.use(cors());


//Get all books
app.get("/book", async (req, res)=>{
    try{
        let response = await axios.get("https://labb2webbapi.azurewebsites.net/book");
        res.json(response.data);
    } catch(error){
        res.status(500).send("No books could be found");
    }
})

//Get book by ID
app.get("/book/:id", async (req, res)=>{
    try{
        let filteredBook = parseInt(req.params.id);
        let response = await axios.get(`https://labb2webbapi.azurewebsites.net/book/${filteredBook}`);
        res.json(response.data);
    } catch(error){
        res.status(500).send("Couldnt find the book");
    }
})

//Insert new Book
app.post("/book", async (req, res)=>{
    try{
        let bookData = req.body
        let response = await axios.post("https://labb2webbapi.azurewebsites.net/book" , bookData);
        res.json(response.data);
    } catch(error){
        res.status(500).send("Could not insert the book");
    }
})

//Update book by ID
app.put("/book/:id", async(req, res) =>{
    try{
        let inputBook = parseInt(req.params.id)
        let updateBook = req.body;
        let response = await axios.put(`https://labb2webbapi.azurewebsites.net/book/${inputBook}`, updateBook);
        res.json({title: updateBook.title, author: updateBook.author});
    }catch(error){
        res.status(500).send("Could not update the book");
    }
})

//Delete book by ID
app.delete("/book/:id", async (req, res)=>{
    try{
        let filteredBook = parseInt(req.params.id);
        let response = await axios.delete(`https://labb2webbapi.azurewebsites.net/book/${filteredBook}`);
        
        res.json(response.data);
    } catch(error){
        res.status(500).send("Could not delete the book");
    }
})



app.listen(PORT, () => {
    console.log("Listening to port: " + PORT);
})