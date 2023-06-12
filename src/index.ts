import express, { NextFunction } from "express";

import dotenv from "dotenv";
import { json, urlencoded } from "body-parser";
import todoRoutes from "./routes/todos"
import connection from "./db/config";

import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express"

const app = express()
dotenv.config();


app.use(json());

app.use(urlencoded({ extended: true }));
app.use("/", todoRoutes);

app.use(
    (err: Error,
        _: express.Request,
        res: express.Response,
        __: NextFunction
    ) => {
        res.status(500).json({ message: err.message })
    });


const options = {
    definition: {
        openapi: "3.0.0", 
        info:{
            title: "Library API",
            version: "1.0.0",
            description: "A simple Express Library API"
        },
        servers:[{
            url: "http://localhost:3000/"
        }],
        
    },
    apis: ["./routes/*.ts"]
}


const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUi.setup(specs, { explorer: true }));


const port = process.env.PORT;

connection.sync().then(() => {
    console.log("Database synced successfully");
}).catch((err) => {
    console.log("Connect database fail", err);
})

app.listen(port, () => {

    console.log(`connected ${port}`)
   
});

