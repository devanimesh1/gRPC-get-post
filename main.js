import express from 'express';
import path from 'path';
import client from './client.js'


const app = express();


app.use(express.json())
app.use(express.urlencoded({extended : true}))

//Get request
app.get('/', (req, res) => {
    client.getUsers(null, (err, data) => {
        if(!err){
            res.send(data)
        }else{
            console.error(err);
            res.status(500).send({
                msg: "server side error"
            })
        }
        })
    })

//Post request
app.post('/add', (req, res) => {
    const user = req.body;
    
    client.addUser(user, (err, data) => {
        if(!err){
            console.log(data);
            res.send({msg : "data added successfully!"})
        }else{
            console.error(err);
            res.status(500).send({msg : "server error"})
        }
    });
})
    app.listen(3232 , () =>{
        console.log("Server started at 3232");
    })