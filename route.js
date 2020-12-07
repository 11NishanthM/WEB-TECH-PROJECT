var express = require("express")
var router = express.Router() 
var MongoClient = require("mongodb").MongoClient

router.get("/scores",(req,res)=>{
    MongoClient.connect("mongodb://localhost:27017",{
            useUnifiedTopology:true
        },(err,client)=>{
            if(err)
                res.send("CONNECTION FAILED")
            var db = client.db("newdb")
            db.collection("score").find({}).toArray((err,obj)=>
            {
                if(err)
                    res.send("FETCH FAILED FAILED")
                else
                    res.send(obj)
            })
         
        })
})
router.post("/",(req,res)=>{
    MongoClient.connect("mongodb://localhost:27017",{
            useUnifiedTopology:true
        },(err,client)=>{
            if(err)
                res.send("CONNECTION FAILED")
            var db = client.db("newdb")
            db.collection("score").insertOne(req.body,(err)=>
            {
                if(err)
                    res.send("INSERTION FAILED")
            })
         
        })
})

module.exports = router