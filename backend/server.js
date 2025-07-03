const express = require('express')
const { MongoClient, ObjectId } = require('mongodb');
const dotenv = require('dotenv');
const cors=require('cors');

// Connection URL
dotenv.config()
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'passop';

const app = express()

const port = 3000
app.use(express.json());
app.use(cors());

let collection;

client.connect().then(() => {
  const db = client.db(dbName);
  collection = db.collection('passwords'); // Make sure the collection name matches your DB
  app.listen(port, () => {
    console.log(`Example app listening on port  http://localhost:${port}`)
  })
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

// Get all the Passwords
app.get('/', async (req, res) => {
  if (!collection) return res.status(500).send('Database not initialized');
  const findResult = await collection.find({}).toArray();
  res.json(findResult);
})

// Save a Password
app.post('/', async (req, res) => {
  if (!collection) return res.status(500).send('Database not initialized');
  // Example: insert the password sent in the request body
  const insertResult = await collection.insertOne(req.body);
  res.json(insertResult);
})

// Delete a Password

app.delete('/', async (req, res) => {
  const password=req.body;
  const db=client.db(dbName);
  const collection = db.collection('passwords');
  const finalResult = await collection.deleteOne(password);
  res.send({success: true, result: finalResult});
})

