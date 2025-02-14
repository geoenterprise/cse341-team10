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
        //#swagger.tags=['Facilities']
        controller.getAll(req, res, collections.facilities(req, res))
    }
)
routes.get(
    '/:id', 
    (req, res) => {
        //#swagger.tags=['Facilities']
        controller.getSingle(req, res, collections.facilities(req, res))
    }
)
routes.post(
    '/',
    // isAuthenticated,
    validation.saveFacilities,
    (req, res) => {
        //#swagger.tags=['Facilities']
        controller.create(req, res, collections.facilities(req, res))
    }
)
routes.put(
    '/:id', 
    validation.saveFacilities,
    // isAuthenticated,
    (req, res) => {
        //#swagger.tags=['Facilities']
        controller.update(req, res, collections.facilities(req, res))
    }
)
routes.delete(
    '/:id',
    // isAuthenticated,
    (req, res) => {
        //#swagger.tags=['Facilities']
        controller.deleteItem(req, res, collections.facilities(req, res))
    }
)

module.exports = routes;