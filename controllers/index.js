const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, collection) => {
    const result = await mongodb.getDatabase().db().collection(collection.name).find();
    result.toArray().then((items) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(items);
    });
};

const getSingle = async (req, res, collection) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must be valid ID to update');
    }
    const id = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection(collection.name).find({ _id: id });
    result.toArray().then((items) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(items[0]);
    });
};

const create = async (req, res, collection) => {
    const objectRules = collection.rules;

    const result = await mongodb.getDatabase().db().collection(collection.name).insertOne(objectRules);
    if (result.acknowledged > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || `Error occurred while creating an item in ${collection.name}`);
    }
};

const update = async (req, res, collection) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must be valid ID to update');
    }
    const id = new ObjectId(req.params.id);
    const objectRules = collection.rules;
    const result = await mongodb.getDatabase().db().collection(collection.name).replaceOne({ _id: id }, objectRules);
    if (result.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(result.error || `Error occurred while updating an item in ${collection.name}`);
    }
};

const deleteItem = async (req, res, collection) => {
    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json('Must be valid ID to delete');
    }
    const id = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection(collection.name).deleteOne({ _id: id });
    if (result.deleteCount > 0) {
        res.status(500).json({ message: `item not found in ${collection.name} or already deleted` });
    } else {
        res.status(204).send();
    }
};

module.exports = {
    getAll,
    getSingle,
    create,
    update,
    deleteItem
}