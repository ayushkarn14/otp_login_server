const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require("./models/user.model.js");
const Book = require("./models/book.model.js");
const { ObjectId } = require('mongodb');
const app = express();
app.use(express.json());
const PORT = 3000;

app.use(cors());
mongoose.connect('mongodb+srv://ayushkarn:1234@cluster0.otehse1.mongodb.net/otp?retryWrites=true&w=majority&appName=Cluster0').then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => {
        console.log("Server running on port", PORT);
    })
}).catch((e) => {
    console.log(e.message);
});

//APIs for user
//add new user
app.post("/user", async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json({ message: "New user added" });
        return;
    }
    catch (err) {
        res.status(500).json({ message: err });
        return;
    }
})
//get user by username
app.get("/user/:username", async (req, res) => {
    try {
        const username = req.params.username;
        const user = await User.findOne({ username: username });
        if (!user) {
            res.status(404).json({ error: 'User not found' });
            return;
        }
        res.json(user);
        return;
    }
    catch (err) {
        res.status(500).json({ message: err });
        return;
    }
})
//get user by phone
app.get("/phone/:phone", async (req, res) => {
    try {
        const phone = req.params.phone;
        const user = await User.findOne({ phone: phone });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json(user);
        return;
    }
    catch (err) {
        res.status(500).json({ message: err });
        return;
    }
})


//APIs for books
//add new book
app.post("/book", async (req, res) => {
    try {
        const book = await Book.create(req.body);
        res.status(200).json({ message: "New book added" });
        return;
    }
    catch (e) {
        console.log(e);
    }
})
//get book by owner
app.get("/book/own/:username", async (req, res) => {
    try {
        const username = req.params.username;
        const books = await Book.find({ ownedby: username });
        console.log(books);
        if (!books) {
            res.status(404).json({ error: 'No books found' });
            return;
        }
        res.json(books);
        return;
    }
    catch (e) {
        console.log(e);
    }
})
//get book by tenant
app.get("/book/lent/:username", async (req, res) => {
    try {
        const username = req.params.username;
        const books = await Book.find({ lentto: username });
        console.log(books);
        if (!books) {
            res.status(404).json({ error: 'No books found' });
            return;
        }
        res.json(books);
        return;
    }
    catch (e) {
        console.log(e);
    }
})
//get book by location
app.get("/book/location/:city", async (req, res) => {
    try {
        const city = req.params.city;
        const books = await Book.find({ location: city });
        console.log(books);
        if (!books) {
            res.status(404).json({ error: 'No books found' });
            return;
        }
        res.json(books);
        return;
    }
    catch (e) {
        console.log(e);
    }
})
app.get("/locations", async (req, res) => {
    try {
        const books = await Book.find();
        console.log(books);
        let locations = [];
        for (let i = 0; i < books.length; i++) {
            //making sure no duplicate city appears in list
            if (!locations.includes(books[i].location.toUpperCase()))
                locations.push(books[i].location.toUpperCase());
        }
        console.log(locations);
        res.json(locations);
        return;
    }
    catch (e) {

    }
})

// app.put("/interested", async (req, res) => {
//     try {
//         res.json(req.body);

//         const book = await Book.findOne({ ownedby: req.body.ownedby, name: req.body.name });
//         book.interested.push('ayush');

//     }
//     catch (e) {
//         console.log(e);
//     }
// })