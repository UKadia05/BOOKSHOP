import express from 'express'
import cors from 'cors'
import {PORT,MongoDBURL}from'./config.js'
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb"
const app = express()

app.use(cors())
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

    mybooks.find().toArray()
    .then(response=>{
       // console.log(response)//
        return res.status(200).send(response)
        
    })

    //return res.status(202).send("<a href='/'>Home</a>")//


})

app.get('/shop/:id',(req, res)=>{
    const data = req.params
    //return res.status(202).send(`<a href='/'> Book: ${data.id}</a>`)//
    const filter={
        "_id": new ObjectId(data.id)
    }

    mybooks.findOne(filter)
    .then(response=>{
       // console.log(response)//
        return res.status(200).send(response)
        
    })
    
    
    .catch(err=>console.log(err))
})

app.post('/admin/savebook',(req, res)=>{
    const data = req.body
    if (!data.title)
    return res.status(400).send({message:"No Title found"})

    if (!data.author)
    return res.status(400).send({message:"No Author found"})

    if (!data.price)
    return res.status(400).send({message:"No Price found"})

    mybooks.insertOne(data)
    .then(response=>{
        return res.status(201).send(JSON.stringify(data))
    })
        .catch(err=>console.log(err))
    })

    



app.delete('/admin/remove/:id', (req,res)=>{
    const data =req.params
    const filter={
        "_id": new ObjectId(data.id)
    }

    mybooks.deleteOne(filter)
    .then(response=>{
        if (response.deletedCount)

        return res.status(200).send({message:"Book Deleted Successfully"})
        else
        return res.status(500).send({message:"Something went real Wrong"})
        
    })
    .catch(err=>console.log(err))

})



app.put('/admin/update/:id/',(req,res)=>{
    const data = req.params
    const docData = req.body

    const filter ={
        "_id": new ObjectId(data.id)
    }

    delete docData._id

    const updDoc ={
        $set: {
        ...docData
     }
    }

    
    mybooks.updateOne(filter,updDoc)
    .then(response=>{
        let msg={}
        if (!response.matchedCount || !response.modifiedCount)
            msg = {message: "Oops! Something went wrong!."}
        else
            msg ={message:"Update Successful."}
        res.status(200).send(msg)

    })

    .catch(err=>console.log(err))
})