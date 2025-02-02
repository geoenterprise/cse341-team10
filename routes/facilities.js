const express = require('express');
const routes = express.Router();
const facilitiesController = require('../controllers/facilities');
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");

routes.get('/', facilitiesController.getAllFacilities);
routes.get('/:id', facilitiesController.getSingleFacility);
routes.post('/', isAuthenticated, validation.saveFacilities, facilitiesController.createFacility);
routes.put('/:id', isAuthenticated, validation.saveFacilities, facilitiesController.updateFacility);
routes.delete('/:id', isAuthenticated, facilitiesController.deleteFacility);

module.exports = routes;