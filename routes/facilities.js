const express = require('express');
const routes = express.Router();
const facilitiesController = require('../controllers/facilities');
const validation = require('../middleware/validate');
// const { isAuthenticated } = require("../middleware/authenticate");

routes.get('/', facilitiesController.getAllFacilities);
routes.get('/:id', facilitiesController.getSingleFacility);
// Commented out for OAuth
// routes.post('/', isAuthenticated, validation.saveFacilities, facilitiesController.createFacility);
// routes.put('/:id', isAuthenticated, validation.saveFacilities, facilitiesController.updateFacility);
// routes.delete('/:id', isAuthenticated, facilitiesController.deleteFacility);
routes.put(
    '/test/:id', 
    validation.saveEmployees, 
    (req, res) => {
        //#swagger.tags=['Employees']
        facilitiesController.update(req, res, 'employees', {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            badgenumber: req.body.badgenumber,
            department: req.body.department,
            shift: req.body.shift,
            location: req.body.location,
            status: req.body.status
        }
    )}
)
routes.post('/', validation.saveFacilities, facilitiesController.createFacility);
routes.put('/:id', validation.saveFacilities, facilitiesController.updateFacility);
routes.delete('/:id', facilitiesController.deleteFacility);

module.exports = routes;