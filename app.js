require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { ObjectId } = require('mongodb')
const port = (process.env.PORT || 5500)
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.MONGO_URI; 

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

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
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
//run().catch(console.dir);

async function cxnDB(){

  try{
    await client.connect().then(
      client.db("humphries-cool-papa-database").collection("dev-profiles")
      );       
  }
  catch(e){
      console.log(e)
  }
  finally{
    client.close; 
  }
}


app.get('/', async (req, res) => {

 client.connect;
  let mongoResult = await client.db("humphries-cool-papa-database").collection("dev-profiles").find().toArray();
// console.log("get/: ", result);
console.log(mongoResult);
  //'res.send("here for a second: " + result[0].name)
  res.render('index', { 
    profileData : mongoResult })
})

// Update Database
app.post('/updateProfile', async (req, res) => {

  try {
    //get the new dev name
    console.log("body: ", req.body)
    console.log("user Name: ", req.body.devName)
    
    client.connect; 
    const collection = client.db("humphries-cool-papa-database").collection("dev-profiles");
  
    // put it into mongo
    let result = await collection.findOneAndUpdate( 
      { _id: new ObjectId( req.body.devId ) },
      {$set: {name: req.body.devName }})
      .then(result => {
        console.log(result); 
        res.redirect('/');
      })
      .catch(error => console.error(error))
     
   
  }
  finally{
    //client.close()
  }
})


// Insert users into database
app.post('/insertProfile', async (req, res) => {

  try {
    //get the new dev name
    console.log("body: ", req.body)
    console.log("user Name: ", req.body.devName)
    
    client.connect; 
    const collection = client.db("humphries-cool-papa-database").collection("dev-profiles");
  
    // put it into mongo
    let result = await collection.insertOne( 
      { name: req.body.newDevName })
      .then(result => {
        console.log(result); 
        res.redirect('/');
      })
      .catch(error => console.error(error))
     
   
  }
  finally{
    //client.close()
  }
})


// delete users from database
app.post('/deleteProfile', async (req, res) => {

  try {
    //get the new dev name
    console.log("body: ", req.body)
    console.log("user Name: ", req.body.devName)
    
    client.connect; 
    const collection = client.db("humphries-cool-papa-database").collection("dev-profiles");
  
    // put it into mongo
    let result = await collection.findOneAndDelete( 
      { _id: new ObjectId( req.body.devId) })
      .then(result => {
        console.log(result); 
        res.redirect('/');
      })
      .catch(error => console.error(error))
     
   
  }
  finally{
    //client.close()
  }
})

let myVariableServer = 'soft coded server data';

app.get('/humphries', function (req, res) {
  res.render('index', 
  {
    'myVariableClient' : myVariableServer 
  }
  );
})

app.post('/postClientData', function (req, res) {
  
   console.log("body: ", req.body)
   console.log("user Name: ", req.body.userName)
  //  console.log("params: ", req.params['userName']);
  
  // myVariableServer = req.body.userName;

  res.render('index', 
  {
    'myVariableClient' : req.body.userName 
  }
  );
})


// app.get('/', function (req, res) {
//   res.send('<h1>Hello World From Express & a PaaS/Render</h1>')
// })

// app.get('/whatever', function (req, res) {
//   res.sendFile(__dirname + '/index.html');
// })



// app.listen(3000)

app.listen(port, () => console.log(`Server is running...on ${ port }` ));