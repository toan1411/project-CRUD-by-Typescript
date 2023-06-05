import {Sequelize} from "sequelize-typescript"
import dotenv from "dotenv";

import {Todos} from "../models/todos"

dotenv.config();

const connection = new Sequelize({
    dialect: "mysql",
    host: "localhost",
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    logging: false,
    models: [Todos]
})

export default connection;