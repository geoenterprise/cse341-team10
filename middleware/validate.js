const validator = require('../helpers/validate');

const saveEmployees = (req, res, next) => {
    const employeeValidationRule = {
        firstname: "required|string",
        lastname: "required|string",
        badgenumber: "required|string",
        department: "required|string",
        shift: "required|string",
        location: "required|string",
        status: "required|string"
    };
    

    validator(req.body, employeeValidationRule, {}, (err, status) => {
        if (!status) {
            res.status(400).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

const saveFacilities = (req, res, next) => {
    
    const facilityValidationRule = {
        facilityLocation: "required|string",
        facilityName: "required|string",
        facilityStatus: "required|string"
    };

    validator(req.body, facilityValidationRule, {}, (err, status) => {
        if (!status) {
            res.status(400).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

const saveDepartments = (req, res, next) => {
    
    const facilityValidationRule = {
        name: "required|string",
        contactInfo: "required|string",
        budget: "required|string",
        teamSize: "required|string"
    };

    validator(req.body, facilityValidationRule, {}, (err, status) => {
        if (!status) {
            res.status(400).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

const saveLocations = (req, res, next) => {
    
    const facilityValidationRule = {
        locationName: "required|string",
        address: "required|string",
        hours: "required|string"
    };

    validator(req.body, facilityValidationRule, {}, (err, status) => {
        if (!status) {
            res.status(400).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

const saveManagers = (req, res, next) => {
    
    const facilityValidationRule = {
        firstName: "required|string",
        lastName: "required|string",
        badgeNumber: "required|string",
        email: "required|email"
    };

    validator(req.body, facilityValidationRule, {}, (err, status) => {
        if (!status) {
            res.status(400).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = {
    saveEmployees,
    saveFacilities,
    saveDepartments,
    saveLocations,
    saveManagers
};