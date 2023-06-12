import { Router } from "express";

const controller = require('../controller/todo')

const router = Router();


router.post("/", controller.createEmployee);
router.get("/",controller.getAllEmployee);
router.get("/:id",controller.getEmployeeById);
router.put("/:id",controller.updateEmployee);
router.delete("/:id",controller.deleteEmployee)

export default router;