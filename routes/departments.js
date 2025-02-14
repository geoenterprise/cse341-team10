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
        //#swagger.tags=['Departments']
        controller.getAll(req, res, collections.departments(req))
    }
)
routes.get(
    '/:id', 
    (req, res) => {
        //#swagger.tags=['Departments']
        controller.getSingle(req, res, collections.departments(req))
    }
)
routes.post(
    '/',
    isAuthenticated,
    validation.saveDepartments,
    (req, res) => {
        //#swagger.tags=['Departments']
        controller.create(req, res, collections.departments(req))
    }
)
routes.put(
    '/:id', 
    isAuthenticated,
    validation.saveDepartments,
    (req, res) => {
        //#swagger.tags=['Departments']
        controller.update(req, res, collections.departments(req))
    }
)
routes.delete(
    '/:id',
    isAuthenticated,
    (req, res) => {
        //#swagger.tags=['Departments']
        controller.deleteItem(req, res, collections.departments(req.body, false))
    }
)

module.exports = routes;