const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config()
const port = process.env.PORT || 5000;

const app = express();

// midiware
app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zmcxwrx.mongodb.net/?retryWrites=true&w=majority`;
//console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        const tasks = client.db('TaskMan').collection('MyTasks');

        app.post('/tasks', async(req, res) => {
            const task = req.body;
            //console.log(task);
            const result = await tasks.insertOne(task);
            res.send(result);
          })

    }
    finally{

    }

}
run().catch(console.log)



app.get('/', async(req, res) => {
    res.send('Task man Server is running')
})

app.listen(port, () => console.log(`Doctors portal running on ${port}`))