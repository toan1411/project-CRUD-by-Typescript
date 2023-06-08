import express, { NextFunction } from "express";

import dotenv from "dotenv";
import { json, urlencoded } from "body-parser";
import todoRoutes from "./routes/todos"
import connection from "./db/config";


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

connection.sync().then(() => {
    console.log("Database synced successfully");
}).catch((err) => {
    console.log("Connect database fail", err);
})


const port = process.env.PORT;

app.listen(port, () => {
    console.log(`connected ${port}`)
});
