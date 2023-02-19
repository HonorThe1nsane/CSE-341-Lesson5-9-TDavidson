
const ObjectId = require('mongodb').ObjectId;

const mongodb = require('../db/connect');
const { person } = require('../models');
const { personValidation } = require('./validation');


const db = require('../models');
const Person = db.person;

const apiKey = 'KZ9u3ZO4cT5W3nf6HnZc17aYwskqCymnVpqSqo32JJYx3qFqXsCOlwxZXKnSbHDK';


const getData = async (req, res) => {
    const result = await mongodb.getDb().db().collection('person').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);

    });

};
//Swagger function
exports.findAll = (req, res) => {

    console.log(req.header('apiKey'));
    if (req.header('apiKey') === apiKey) {
        Person.find(
            {},
            {
                firstName: 1,
                lastName: 1,
                email: 1,
                birthday: 1,
                _id: 0,
            }
        )
            .then((data) => {
                res.send(data);
            })
            .catch((err) => {
                res.status(500).send({
                    message:
                        err.message || 'Some error occurred while retrieving this person.',
                });
            });
    } else {
        res.send('Invalid apiKey, please read the documentation.');
    }
};
//rest client function
const getSingleData = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('person').find({ _id: userId });
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
        Person.find({ _id: id })
            .then((data) => {
                if (!data)
                    res
                        .status(404)
                        .send({ message: 'No person with id ' + id });
                else res.send(data[0]);
            })
            .catch((err) => {
                res.status(500).send({
                    message: 'Error retrieving person with id=' + id,
                });
            });
    } else {
        res.send('Invalid apiKey, please read the documentation.');
    }
};
// rest client
const createNewPerson = async (req, res) => {

        const person = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            birthday: req.body.birthday
        };
        const response = await mongodb.getDb().db().collection('person').insertOne(person);
        if (response.acknowledged) {
            res.status(201).json(response);
            console.log("Person added successfully");
        } else {
            res.status(500).json(response.error)
            console.log("There was an error adding the person");
            return;
        };
};

//work with swagger
exports.createNewPerson = async (req, res) => {
        const person = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            birthday: req.body.birthday
        };
        const response = await mongodb.getDb().db().collection('person').insertOne(person);
        if (response.acknowledged) {
            res.status(201).json(response).send({ message: 'Person created successfully!' });
        } else {
            res.status(500).json(response.error).send({ message: 'Error creating person!' });
        };
    };
//rest client function
const updatePerson = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: 'Data to update can not be empty!',
        });
    }
    const userId = new ObjectId(req.params.id);
    const person = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDb().db().collection('person').replaceOne({ _id: userId }, person);
    console.log(response);
    if (response.modifiedCount > 0) {
        res.status(204).send('You updated successfully');
    } else {
        res.status(500).json(response.error);
        console.log(response.error);
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

    Person.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Person with id=${id}. Maybe the person was not found!`,
                });
            } else res.send({ message: 'Person was updated successfully.' });
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Error updating Person with id=' + id,
            });
        });
};


//Rest client
const deletePerson = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('person').remove({ _id: userId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error).send({ message: 'Could not delete person with id=' + userId });
    }
};

// Swagger

// Delete a Temple with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Person.findByIdAndRemove(id)
        .then((data) => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Person with id=${id}. Maybe the car was not found!`,
                });
            } else {
                res.send({
                    message: 'Person was deleted successfully!',
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                message: 'Could not delete Person with id=' + id,
            });
        });
};



module.exports = { getSingleData, getData, createNewPerson, updatePerson, deletePerson };
