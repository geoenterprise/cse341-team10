const express = require('express');
const routes = express.Router();
const employeesController = require('../controllers/employees');
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");

routes.get('/', employeesController.getAll);
routes.get('/:id', employeesController.getSingle);
// Commented out for OAuth
// routes.post('/', isAuthenticated, validation.saveEmployees, employeesController.createEmployee);
// routes.put('/:id', isAuthenticated, validation.saveEmployees, employeesController.updateEmployee);
// routes.delete('/:id', isAuthenticated, employeesController.deleteEmployee);
routes.post('/', validation.saveEmployees, employeesController.createEmployee);
routes.put('/:id', validation.saveEmployees, employeesController.updateEmployee);
routes.delete('/:id', employeesController.deleteEmployee);

module.exports = routes;