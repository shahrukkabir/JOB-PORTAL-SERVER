const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wi4y4.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");

        // You can set up database collections here
        const database = client.db("JobPortal");
        const collection = database.collection("jobs");

    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
}

run(); // Do not close the connection

app.get('/', (req, res) => {
    res.send('Job is failing from the sky');
});

// Fix the console log message
app.listen(port, () => {
    console.log(`Job is waiting at : ${port}`);
});
