
const express = require('express');
const app = express();
const portno = 3000;
//Enabled cors
const cors = require('cors');

app.listen(portno, () => {
    console.log(`PORT CONNECT TO: ${portno}`);
})

//parse incoming json requset bodies
app.use(express.json());

// Enable CORS for only the Angular frontend origin (localhost:4200)
const corsOptions = {
    origin: 'http://localhost:4200', // Allow only requests from localhost:4200
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow the HTTP methods
    allowedHeaders: ['Content-Type'], // Allow specific headers
  };

app.use(cors(corsOptions))

// Enable CORS for all routes
//app.use(cors());
// app.use(cors({
//     origin: 'http://localhost:4200/' // Allow requests only from localhost:4200

// }));

//CONNECTING TO MONGO DATABASE
const mongoose = require('mongoose');

const mongodburl = "mongodb://localhost:27017/MPloyChek";
mongoose.connect(mongodburl, {
    serverSelectionTimeoutMS: 30000 // Increase timeout to 30 seconds
})
    .then(() => console.log("MONGODB DATABASE CONNECTED"))
    .catch((err) => console.log(`ERROR CONNECTING TO MONGODB DATABASE ${err}`));

//ROUTES CONNECT
const userRoutes = require('./Routes/AllUsers');
app.use('/Api',userRoutes);

//RANDOM CHECKING
app.get('/',(request,response) => {
    response.send({msg:"Hello"})
    console.log("Heyy");
    //response.sendStatus(200).json({Message:"HII"});
})

