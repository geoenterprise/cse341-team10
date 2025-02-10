const express = require('express');
const routes = express.Router();
const facilitiesController = require('../controllers/facilities')
const controller = require('../controllers/index');
const validation = require('../middleware/validate');
const collections =require('../helpers/collections');
const { Collection } = require('mongoose');
// const { isAuthenticated } = require("../middleware/authenticate");

routes.get('/', facilitiesController.getAllFacilities);
routes.get('/:id', facilitiesController.getSingleFacility);
// Commented out for OAuth
// routes.post('/', isAuthenticated, validation.saveFacilities, facilitiesController.createFacility);
// routes.put('/:id', isAuthenticated, validation.saveFacilities, facilitiesController.updateFacility);
// routes.delete('/:id', isAuthenticated, facilitiesController.deleteFacility);
routes.put(
    '/test/:id', 
    validation.saveFacilities,
    (req, res) => {
        //#swagger.tags=['Facilities']
        controller.update(req, res, collections.facilities(req, res).name)
    }
)
routes.post('/', validation.saveFacilities, facilitiesController.createFacility);
routes.put('/:id', validation.saveFacilities, facilitiesController.updateFacility);
routes.delete('/:id', facilitiesController.deleteFacility);

module.exports = routes;