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
        //#swagger.tags=['Managers']
        controller.getAll(req, res, collections.managers(req, res))
    }
)
routes.get(
    '/:id', 
    (req, res) => {
        //#swagger.tags=['Managers']
        controller.getSingle(req, res, collections.managers(req, res))
    }
)
routes.post(
    '/',
    // isAuthenticated,
    validation.saveManagers,
    (req, res) => {
        //#swagger.tags=['Managers']
        controller.create(req, res, collections.managers(req, res))
    }
)
routes.put(
    '/:id', 
    validation.saveManagers,
    // isAuthenticated,
    (req, res) => {
        //#swagger.tags=['Managers']
        controller.update(req, res, collections.managers(req, res))
    }
)
routes.delete(
    '/:id',
    // isAuthenticated,
    (req, res) => {
        //#swagger.tags=['Managers']
        controller.deleteItem(req, res, collections.managers(req, res))
    }
)

module.exports = routes;