import { RequestHandler } from "express";
const service = require("../service/todos");


const getAllEmployee: RequestHandler = async (req,res) => {
    const allEmployee = await service.getAllEmployee(req.query);

    return res
    .status(200)
    .json({ message: "Todo fetched successfully",length:allEmployee.length , data: allEmployee })
}

const getEmployeeById: RequestHandler = async (req, res) => {
    const {id }= req.params;
    const todos = await service.getEmployeeById(id);
    return res
    .status(200)
    .json({ message: "Todo fetch successfully", data: todos })
}

const updateEmployee: RequestHandler = async (req, res, next) => {
    const { id } = req.params;
    const updatedTodos = await service.updateEmployee(+id, { ...req.body })
    return res
    .status(200)
    .json({ message: "Todo updated successfully", data: updatedTodos })
}

const createEmployee: RequestHandler = async (req, res) => {
    const body = req.body;
    var todos = await service.createEmployee(body);
    console.log(todos)
    return res
    .status(200)
    .json({ message: "Todo created successfully", data: todos })
};

const deleteEmployee: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const deleteToDo = service.deleteEmployee(+id) 
    return res
    .status(200)
    .json({ message: "Todo delected success", data: deleteToDo });
}


module.exports = {
    getAllEmployee,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
}