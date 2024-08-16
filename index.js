const express = require('express');
const dotenv = require('dotenv');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const uri = process.env.MONGO_URI;

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

    const allMobilesCollection = client.db("mobile-store").collection("all-mobile");

    //get all mobile
    app.get("/allmobile", async (req, res) => {
      const allmobile = await allMobilesCollection.find().toArray();
      res.json(allmobile);
    });
   
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
   
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('server is running')
  })
  
  app.listen(port, () => {
    console.log(`server running on port ${port}`);
  });
