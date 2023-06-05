import express from "express";

import dotenv from "dotenv";
//import cors from "cors"
import {json, urlencoded} from "body-parser";
import todoRoutes from "./src/routes/todos"
import connection from "./src/db/config";



//Instantite express app 
const app = express()
dotenv.config();

// use body parser 

app.use(json());


app.use(urlencoded({extended:true}));

app.use("/",todoRoutes);

// //use CORS install types as well
// app.use(cors());


app.use(
    (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
    )=>{
    res.status(500).json({message: err.message})
});

connection.sync().then(()=>{
    console.log("Database synced successfully");
}).catch((err)=>{
    console.log("Err",err);
})



//Define sever port
const port = process.env.PORT;


//start listening to the request on default sever 


 app.listen(port, ()=>{
    console.log(`connected ${port}`)
 });
