const express = require('express');
const routes = express.Router();
const controller = require('../controllers/index');
const validation = require('../middleware/validate');
const collections =require('../helpers/collections');
const { Collection } = require('mongoose');
const { isAuthenticated } = require("../middleware/authenticate");

routes.get(
    '/',
    (req, res) => {
        //#swagger.tags=['Employees']
        controller.getAll(req, res, collections.employees(req))
    }
)
routes.get(
    '/:id', 
    (req, res) => {
        //#swagger.tags=['Employees']
        controller.getSingle(req, res, collections.employees(req))
    }
)
routes.post(
    '/',
    isAuthenticated,
    validation.saveEmployees,
    (req, res) => {
        //#swagger.tags=['Employees']
        controller.create(req, res, collections.employees(req))
    }
)
routes.put(
    '/:id', 
    isAuthenticated,
    validation.saveEmployees,
    (req, res) => {
        //#swagger.tags=['Employees']
        controller.update(req, res, collections.employees(req))
    }
)
routes.delete(
    '/:id',
    isAuthenticated,
    (req, res) => {
        //#swagger.tags=['Employees']
        controller.deleteItem(req, res, collections.employees(req.body, false))
    }
)

module.exports = routes;