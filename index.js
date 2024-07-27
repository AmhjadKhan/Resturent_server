const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;

// middleWar
app.use(cors());
app.use(express.json());


// mongodbcode 

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.wes7nwd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    
    // data collection take 
    const menuCollection = client.db("resturentDb").collection("menu");
    const reviewCollection = client.db("resturentDb").collection("reviews");
    const cartCollection = client.db("resturentDb").collection("carts");
     
    //  menu collection 
    app.get('/menu', async(req,res) =>{
        const result = await menuCollection.find().toArray();
        res.send(result);
    })
    // review collection 
    app.get('/reviews', async(req,res)=>{
       const result = await reviewCollection.find().toArray();
       res.send(result)
    })
  
    // cart collection 
     
    // post method 
    app.post('/carts', async(req, res) =>{
      const cartItem = req.body;
      const result = await cartCollection.insertOne(cartItem);
      res.send(result);
    })

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Resturent food is ready')
})

app.listen(port, () => {
    console.log(`Resturent food is sitting on port ${port}`)
})