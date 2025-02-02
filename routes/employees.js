const express = require('express');
const routes = express.Router();
const employeesController = require('../controllers/employees');
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");

routes.get('/', employeesController.getAll);
routes.get('/:id', employeesController.getSingle);
routes.post('/', isAuthenticated, validation.saveEmployees, employeesController.createEmployee);
routes.put('/:id', isAuthenticated, validation.saveEmployees, employeesController.updateEmployee);
routes.delete('/:id', isAuthenticated, employeesController.deleteEmployee);

module.exports = routes;