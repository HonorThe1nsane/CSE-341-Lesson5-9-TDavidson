
const ObjectId = require('mongodb').ObjectId;

const mongodb = require('../db/connect');
const { car } = require('../models');

const db = require('../models');
const Car = db.car;

const apiKey = 'KZ9u3ZO4cT5W3nf6HnZc17aYwskqCymnVpqSqo32JJYx3qFqXsCOlwxZXKnSbHDK';


const getData = async (req, res) => {
    const result = await mongodb.getDb().db().collection('cars').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);

    });

};
//Swagger function
exports.findAll = (req, res) => {

    console.log(req.header('apiKey'));
    if (req.header('apiKey') === apiKey) {
        Car.find(
            {},
            {
                carMake: 1,
                carModel: 1,
                engineSize: 1,
                color: 1,
                year: 1,
                price: 1,
                _id: 0,
            }
        )
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.status(500).send({
                    message:
                        err.message || 'Some error occurred while retrieving cars.',
                });
            });
    } else {
        res.send('Invalid apiKey, please read the documentation.');
    }
};
//rest client function
const getSingleData = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('cars').find({ _id: userId });
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);

    });

};
//Work with swagger
exports.getSingleData = (req, res) => {

    const id = new ObjectId(req.params.id);
    console.log(id);
    if (req.header('apiKey') === apiKey) {
        Car.find({ _id: id })
            .then((data) => {
                if (!data)
                    res
                        .status(404)
                        .send({ message: 'No car found with id ' + id });
                else res.send(data[0]);
            })
            .catch((err) => {
                res.status(500).send({
                    message: 'Error retrieving car with id=' + id,
                });
            });
    } else {
        res.send('Invalid apiKey, please read the documentation.');
    }
};
// rest client
const createNewCar = async (req, res) => {
    const car = {
        carMake: req.body.carMake,
        carModel: req.body.carModel,
        engineSize: req.body.engineSize,
        favoriteColor: req.body.favoriteColor,
        year: req.body.year,
        price: req.body.price
    };
    const response = await mongodb.getDb().db().collection('cars').insertOne(car);
    if (response.acknowledged) {
        res.status(201).json(response);
    } else {
        res.status(500).json(response.error || 'Some error occurred while creating the car.');
    }
};
//work with swagger
exports.createNewCar = (req, res) => {
    const car = {
        carMake: req.body.carMake,
        carModel: req.body.carModel,
        engineSize: req.body.engineSize,
        favoriteColor: req.body.favoriteColor,
        year: req.body.year,
        price: req.body.price
    };
    car
        .save(car)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while creating the car.',
            });
        });
};
//rest client function
const updateCar = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: 'Data to update can not be empty!',
        });
    }
    const userId = new ObjectId(req.params.id);
    const car = {
        carMake: req.body.carMake,
        carModel: req.body.carModel,
        engineSize: req.body.engineSize,
        favoriteColor: req.body.favoriteColor,
        year: req.body.year,
        price: req.body.price
    };
    const response = await mongodb.getDb().db().collection('cars').replaceOne({ _id: userId }, car);
    console.log(response);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the car in Hot-cars.');
    }
};
//swagger
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: 'Data to update can not be empty!',
        });
    }

    const id = new ObjectId(req.params.id);

    Car.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Car with id=${id}. Maybe the car was not found!`,
                });
            } else res.send({ message: 'Car was updated successfully.' });
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error updating Car with id=' + id,
            });
        });
};


//Rest client
const deleteCar = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('cars').remove({ _id: userId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the car.');
    }
};

// Swagger

// Delete a Temple with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Cars.findByIdAndRemove(id)
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Car with id=${id}. Maybe the car was not found!`,
                });
            } else {
                res.send({
                    message: 'Car was deleted successfully!',
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Could not delete Car with id=' + id,
            });
        });
};

module.exports = { getSingleData, getData, createNewCar, updateCar, deleteCar };
