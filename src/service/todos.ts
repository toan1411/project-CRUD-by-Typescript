import { Todos } from "../models/todos";

const getAllEmployee = async () => {
    const allEmployee = await Todos.findAll();
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