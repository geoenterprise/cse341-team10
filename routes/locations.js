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
        //#swagger.tags=['Locations']
        controller.getAll(req, res, collections.locations(req))
    }
)
routes.get(
    '/:id', 
    (req, res) => {
        //#swagger.tags=['Locations']
        controller.getSingle(req, res, collections.locations(req))
    }
)
routes.post(
    '/',
    isAuthenticated,
    validation.saveLocations,
    (req, res) => {
        //#swagger.tags=['Locations']
        controller.create(req, res, collections.locations(req))
    }
)
routes.put(
    '/:id', 
    isAuthenticated,
    validation.saveLocations,
    (req, res) => {
        //#swagger.tags=['Locations']
        controller.update(req, res, collections.locations(req))
    }
)
routes.delete(
    '/:id',
    isAuthenticated,
    (req, res) => {
        //#swagger.tags=['Locations']
        controller.deleteItem(req, res, collections.locations(req.body, false))
    }
)

module.exports = routes;