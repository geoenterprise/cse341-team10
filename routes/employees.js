const express = require('express');
const routes = express.Router();
const controller = require('../controllers/index');
const validation = require('../middleware/validate');
const collections =require('../helpers/collections');
const { Collection } = require('mongoose');
// const { isAuthenticated } = require("../middleware/authenticate");

routes.get(
    '/',
    (req, res) => {
        //#swagger.tags=['Employees']
        controller.getAll(req, res, collections.employees(req, res))
    }
)
routes.get(
    '/:id', 
    (req, res) => {
        //#swagger.tags=['Employees']
        controller.getSingle(req, res, collections.employees(req, res))
    }
)
routes.post(
    '/',
    // isAuthenticated,
    validation.saveEmployees,
    (req, res) => {
        //#swagger.tags=['Employees']
        controller.create(req, res, collections.employees(req, res))
    }
)
routes.put(
    '/:id', 
    validation.saveEmployees,
    // isAuthenticated,
    (req, res) => {
        //#swagger.tags=['Employees']
        controller.update(req, res, collections.employees(req, res))
    }
)
routes.delete(
    '/:id',
    // isAuthenticated,
    (req, res) => {
        //#swagger.tags=['Employees']
        controller.deleteItem(req, res, collections.employees(req, res))
    }
)

module.exports = routes;