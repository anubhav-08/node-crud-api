const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const excerciseRoutes = require('./routes/excercise');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;


const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser:true, useCreateIndex:true, useFindAndModify:true});
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("MongoDB connection established successfully");
});

app.use(express.json());
app.use(cors());
app.use('/user', userRoutes);
app.use('/excercise', excerciseRoutes);

// app.get('/', (req, res) => {
//     console.log(req);
//     res.status = 200;
//     res.json({"message": "Hello World"});
//  });

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});
