const express = require('express')
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
require('dotenv').config();

// middleware
app.use(cors())
app.use(express.json());


//GeniusCar  Y37oo9QJu06vp0sB

const uri = "mongodb+srv://GeniusCar:Y37oo9QJu06vp0sB@cluster0.ksaovkw.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const servicesCollection = client.db("GeniusCarDB").collection("services");
        const ordersCollection = client.db("GeniusCarDB").collection("orders");

        app.get('/services', async (req, res) => {
            const query = {};
            const services = await servicesCollection.find(query).toArray();
            res.send(services);
        })
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await servicesCollection.findOne(query);
            res.send(service);
        })

        app.get('/orders', async (req, res) => {
            let query = {};
            if (req.query.email) {
                query = {
                    email: req.query.email
                }
            }

            const orders = await ordersCollection.find(query).toArray();
            res.send(orders);

        })

        //orders api
        app.post('/orders', async (req, res) => {
            const order = req.body;
            const result = await ordersCollection.insertOne(order);
            res.send(result);
        })




    }
    finally {
        // await client.close();
    }
}
run().catch(error => console.log(error));




app.get('/', (req, res) => {
    res.send('Genius-car-server Running!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})