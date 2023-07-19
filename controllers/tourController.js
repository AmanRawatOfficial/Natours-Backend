const Tour = require('./../models/tourModel');

function checkBody(req, res, next) {
    const { name, price } = req.body;
    if (!name || !price) {
        return res.status(400).json({
            status: 'fail',
            message: 'Missing name or price',
        });
    }
    next();
}

function getAllTours(req, res) {
    res.status(200).json({
        status: 'success',
        // results: tours.length,
        // data: {
        //     tours,
        // },
    });
}

function getTour(req, res) {
    res.status(200).json({
        status: 'success',
        // data: {
        //     tour,
        // },
    });
}

function createTour(req, res) {
    res.status(201).json({
        status: 'success',
        // data: {
        //     tour: newTour,
        // },
    });
}

function updateTour(req, res) {
    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Update tour here...>',
        },
    });
}

function deleteTour(req, res) {
    res.status(204).json({
        status: 'success',
        data: null,
    });
}

module.exports = {
    getAllTours,
    getTour,
    createTour,
    updateTour,
    deleteTour,
    checkBody,
};
