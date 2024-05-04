const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserModel = require('./models/Users');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://bunnysayzz:Azhar%408969@cluster0.xh0wcui.mongodb.net/mern?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.error("Error connecting to MongoDB:", error);
    });

app.get('/getUsers', (req, res) => {
    UserModel.find({})
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).json({ error: err.message });
        });
});

app.post('/createusers', async (req, res) => {
    const { name, age } = req.body;
    try {
        const newUser = new UserModel({ name, age });
        await newUser.save();
        res.json({ message: "User added successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
