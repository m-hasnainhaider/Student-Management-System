import express from 'express'
import dotenv from 'dotenv'
import { Connection,StudentModel } from './postgres/postgres.js';
import { where } from 'sequelize';
import cors from 'cors'
dotenv.config();
const app=express();
app.use(express.json())
app.use(cors({
   origin:'http://localhost:3000'
}
))

Connection();//used to connect with the database
app.listen(process.env.PORT,()=>{
    console.log("Server Started");
})

app.get('/',(req,res)=>{
    res.send("Hellowrld");
})


app.get('/get-all-students',async(req,res)=>{
try{
let data=await StudentModel.findAll();
res.send(data);
}
catch(error){
console.log(error)
}
})

app.get('/student/:id',async(req,res)=>{
    try{
        let id=req.params.id;
        let data=await StudentModel.findOne({where:{'id':id}});
        res.send(data);
    }
    catch(error){
        console.log(error);
    }
})

app.post('/create-student',async(req,res)=>{
    try{
        let {name,age}=req.body;
        await StudentModel.create({name,age});
        res.send("Student Created");
    }
    catch(error){

    }
})

app.put('/update-student/:id',async(req,res)=>{
    try{
        let id=req.params.id;
        let newdata=req.body;
        await StudentModel.update(newdata,{where:{'id':id}});
        res.send("data Updated");
    }
    catch(error){
        console.log(error);
    }
})

app.delete('/delete-student/:id',async(req,res)=>{
    try{
        let id=req.params.id;
        let tempstu=await StudentModel.findOne({where:{'id':id}});
        if(tempstu){
            await tempstu.destroy();
            res.send("Student Deleted")
        }
        else{
            res.send("Student Not Found");
        }
    }
    catch(error){
        console.log(error);
    }
})