import express from 'express'
import {PORT,MongoDBURL}from'./config.js'
import { MongoClient, ServerApiVersion } from "mongodb"
const app = express()


app.use(express.json())

const client = new MongoClient(MongoDBURL,  {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
}
);

const booksDB =client.db("mybookshop")
const mybooks= booksDB.collection("bookscollection")

app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}`)

})



app.get('/',(req, res)=>{
    return res.status(202).send("<h1>HELLO Boii!")


})

app.get('/shop',(req, res)=>{
    return res.status(202).send("<a href='/'>Home</a>")
})

app.get('/shop/:id',(req, res)=>{
    const data = req.params
    return res.status(202).send(`<a href='/'> Book: ${data.id}</a>`)
})

app.post('/savebook',(req, res)=>{
    const data = req.body
    if (!data.title)
    return res.status(400).send("No Title found")

    if (!data.author)
    return res.status(400).send("No Author found")

    if (!data.price)
    return res.status(400).send("No Price found")

    mybooks.insertOne(data,(error,res)=>{
        if(error){
            console.log("An ERROR occured")
            return res.sendStatus(500)
        }

    })

    return res.status(201).send(JSON.stringify(data))

})