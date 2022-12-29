const  express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();

const port = process.env.PORT || 5000;

//middlewares
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.6znnq0v.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const addtaskCollection = client.db('taskmanager').collection('addtask');
        const mytaskCollection = client.db('taskmanager').collection('mytask');

       

        //get task api
        app.get('/addtask',async(req,res)=>{
           const query = {} //for get all data
           const cursor = addtaskCollection.find(query);
           const tasks = await cursor.toArray();
            res.send(tasks);
        })

       
        // task post api
        app.post('/addtask',async(req,res)=>{
            const task = req.body;
            const result = await addtaskCollection.insertOne(task);
            res.send(result);
        })

       

        //  app.get('/reviews',async(req,res)=>{
           
        //     let query = {} //for get all data
        //     if(req.query.email){
        //         query = {
        //             email: req.query.email
        //         }
        //     }
           
        //     const cursor = reviewCollection.find(query);

        //     const reviews = await cursor.toArray();
           
        //      res.send(reviews);
        //  })


        
       
        // app.get('/reviews/:id', async(req,res)=>{
        //     const id = req.params.id;
        //     const query = {_id: ObjectId(id)}
        //     const review = await reviewCollection.findOne(query)
        //     res.send(review)
        // })
        // //update
        // app.patch('/reviews/:id',  async(req,res)=>{
        //     const id =req.params.id;
        //     const review = req.body
        //     const query = {_id: ObjectId(id)}
        //     const option = {upsert:true};

        //     const updatedComment = {
        //         $set:{
        //             comment:review.comment,
                    

        //         }
        //     }
        //     const result = await reviewCollection.updateOne(query,updatedComment,option);
        //     res.send(result)

        // })
        

        // app.delete('/reviews/:id',verifyJWT,  async(req,res)=>{
        //     const id = req.params.id;
        //     const query = {_id:ObjectId(id)};
        //     const result= await reviewCollection.deleteOne(query)
        //     res.send(result)
        // })
    
    }
    finally{

    }

}
run().catch(err=>console.log(err));

app.get('/',(req, res)=>{
    res.send('task manager server running')
})

app.listen(port, () =>{
    console.log(`task manager server running on port ${port}`);
})