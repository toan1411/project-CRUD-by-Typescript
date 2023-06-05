"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDatabase = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const typeorm_1 = require("typeorm");
//Instantite express app 
const app = (0, express_1.default)();
dotenv_1.default.config();
//Create database
exports.AppDatabase = new typeorm_1.DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB
});
//Define sever port
const port = process.env.PORT;
//Create a default route 
app.get('/', (req, res) => {
    res.send('Express + typescript sever');
});
//start listening to the request on default sever 
exports.AppDatabase.initialize().then(() => {
    app.listen(port);
    console.log("Data Source has been initialization");
}).catch((err) => {
    console.error("Error during data source initialization", err);
});
