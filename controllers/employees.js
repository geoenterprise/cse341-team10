const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Employees']
    try {
        const result = await mongodb
            .getDatabase()
            .db()
            .collection('employees')
            .find()
            .toArray();

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Employees']

    try {
        if (!ObjectId.isValid(req.params.id)) {
            res.status(400).json('Must be valid ID to find');
        }
        const employeeId = new ObjectId(req.params.id);
        const result = await mongodb
            .getDatabase()
            .db()
            .collection('employees')
            .findOne({ _id: employeeId });

        if (!result) {
            res.status(404).json({ message: 'Employee not found' });
            return;
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const createEmployee = async (req, res) => {
    //#swagger.tags=['Employees']
    const employee = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        badgeNumber: req.body.badgeNumber,
        department: req.body.department,
        shift: req.body.shift,
        location: req.body.location,
        status: req.body.status
    };

    const result = await mongodb.getDatabase().db().collection('employees').insertOne(employee);
    if (result.acknowledged > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'Error occurred while creating employee');
    }
};

const updateEmployee = async (req, res) => {
    //#swagger.tags=['Employees']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must be valid ID to update');
    }
    const employeeId = new ObjectId(req.params.id);
    const employee = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        badgeNumber: req.body.badgeNumber,
        department: req.body.department,
        shift: req.body.shift,
        location: req.body.location,
        status: req.body.status
    };
    const result = await mongodb.getDatabase().db().collection('employees').replaceOne({ _id: employeeId }, employee);
    if (result.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'Error occurred while updating employee');
    }
};

const deleteEmployee = async (req, res) => {
    //#swagger.tags=['Employees']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must be valid ID to delete');
    }
    const employeeId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('employees').deleteOne({ _id: employeeId });
    if (result.deleteCount > 0) {
        res.status(500).json({ message: 'Employee not found or already deleted' });
    } else {
        res.status(204).send();
    }
};

module.exports = {
    getAll,
    getSingle,
    createEmployee,
    updateEmployee,
    deleteEmployee
}