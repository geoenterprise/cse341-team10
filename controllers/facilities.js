const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllFacilities = async (req, res) => {
    //#swagger.tags=['Facilities']
    const result = await mongodb.getDatabase().db().collection('facilities').find();
    result.toArray().then((facilities) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(facilities);
    });
};

const getSingleFacility = async (req, res) => {
    //#swagger.tags=['Facilities']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must be valid ID to update');
    }
    const facilityId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('facilities').find({ _id: facilityId });
    result.toArray().then((facilities) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(facilities[0]);
    });
};

const createFacility = async (req, res) => {
    //#swagger.tags=['Facilities']
    const facility = {
        facilityLocation: req.body.facilityLocation,
        facilityName: req.body.facilityName,
        facilityStatus: req.body.facilityStatus
    };

    const result = await mongodb.getDatabase().db().collection('facilities').insertOne(facility);
    if (result.acknowledged > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'Error occurred while creating facility');
    }
};

const updateFacility = async (req, res) => {
    //#swagger.tags=['Facilities']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must be valid ID to update');
    }
    const facilityId = new ObjectId(req.params.id);
    const facility = {
        facilityLocation: req.body.facilityLocation,
        facilityName: req.body.facilityName,
        facilityStatus: req.body.facilityStatus
    };
    const result = await mongodb.getDatabase().db().collection('facilities').replaceOne({ _id: facilityId }, facility);
    if (result.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || 'Error occurred while updating facility');
    }
};

const update = async (req, res, collection, rules) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must be valid ID to update');
    }
    const facilityId = new ObjectId(req.params.id);
    const facility = rules;
    const result = await mongodb.getDatabase().db().collection(collection).replaceOne({ _id: facilityId }, facility);
    if (result.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || `Error occurred while updating ${collection}`);
    }
};

const deleteFacility = async (req, res) => {
    //#swagger.tags=['Facilities']
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must be valid ID to delete');
    }
    const facilityId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('facilities').deleteOne({ _id: facilityId });
    if (result.deleteCount > 0) {
        res.status(500).json({ message: 'Facility not found or already deleted' });
    } else {
        res.status(204).send();
    }
};

module.exports = {
    getAllFacilities,
    getSingleFacility,
    createFacility,
    deleteFacility,
    updateFacility,
    update
}