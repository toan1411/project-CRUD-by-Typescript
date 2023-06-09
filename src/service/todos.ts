//import { where } from "sequelize";
import { Todos } from "../models/todos";

const getAllEmployee = async (body: Object) => {
    let queryObj = {...body};

    const excludedFields: string[] = ['page', 'sort', 'limit','fields'];
    excludedFields.forEach((el:string)=> delete (queryObj as { [key: string]: any })[el]);
    console.log(body,queryObj);
    let allEmployee = await Todos.findAll({where:queryObj});
    

    if("sort" in body){
        allEmployee = await Todos.findAll({ order: [['age', 'DESC']], where:queryObj});
    }

    if("fields" in body){
        const fields = body.fields;
        let attributes;
        if (typeof fields === 'string') {
            attributes = fields.split(',');
        }
        allEmployee = await Todos.findAll({ attributes: attributes, where:queryObj});
    }

   
    if("page" in body && "limit" in body){
        const page = Number(body.page)||1;
        const limit = Number(body.limit)||100;
        const skip = (page-1)*limit;

        allEmployee = await Todos.findAll({offset: skip, limit: limit});     
    }

    return allEmployee;
}

const getEmployeeById = async (id: number) => {
    return Todos.findByPk(id);
};

const createEmployee = async (body: Todos) => {
    const newEmployee = await Todos.create({...body});
    return newEmployee;
};

const updateEmployee = async (id: number, body: Todos) => {
    await Todos.update(body, { where: { id } });
    const updatedTodos: Todos | null = await Todos.findByPk(id);
    return updatedTodos;
};

const deleteEmployee = async(id:number) => {
    
    const deleteToDo = await Todos.findByPk(id);

    await Todos.destroy({ where: { id } })
    return deleteToDo;
};

module.exports = {
    getAllEmployee,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deleteEmployee,
};

