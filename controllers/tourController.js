const fs = require('fs');

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

function checkID(req, res, next, val) {
    if (req.params.id >= tours.length || req.params.id < 0) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID',
        });
    }
    next();
}

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
        results: tours.length,
        data: {
            tours,
        },
    });
}

function getTour(req, res) {
    const tour = tours.find((tour) => tour.id === Number(req.params.id));
    res.status(200).json({
        status: 'success',
        data: {
            tour,
        },
    });
}

function createTour(req, res) {
    const newTourId = tours.length;
    const newTour = Object.assign({ id: newTourId }, req.body);

    tours.push(newTour);

    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`,
        JSON.stringify(tours),
        (err) => {
            res.status(201).json({
                status: 'success',
                data: {
                    tour: newTour,
                },
            });
        }
    );
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
    checkID,
    checkBody,
};
