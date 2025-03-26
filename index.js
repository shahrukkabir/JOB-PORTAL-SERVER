const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

        // jobs related apis
        const jobsCollection = client.db("JobPortal").collection("jobs");

        //get all data
        app.get('/jobs', async (req, res) => {
            const cursor = jobsCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        });

        //get one data
        app.get('/jobs/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await jobsCollection.findOne(query);
            res.send(result);
        })

        const jobApplicationCollection = client.db("JobPortal").collection("job_application");
        
        //job application api
        app.post('/job-applications', async (req, res) => {
            const application = req.body;
            const result = await jobApplicationCollection.insertOne(application);
            res.send(result);
        })
        
        //get some data
        app.get('/job-application', async (req, res) => {
            const email = req.query.email;
            const query = {applicant_email: email}
            const result = await jobApplicationCollection.find(query).toArray();
            res.send(result);
        })
    }
    catch (error) {
        console.error("MongoDB connection error:", error);
    }
}

run();

app.get('/', (req, res) => {
    res.send('Job is failing from the sky');
});

app.listen(port, () => {
    console.log(`Job is waiting at : ${port}`);
});
