const express = require('express');
const morgan = require('morgan');

const app = express();

//* 1) Middlewares

app.use(express.json());
app.use(morgan('dev'));

app.use((req, res, next) => {
    console.log('Hello from the middleware 🙂');
    next();
});

const fs = require('fs');
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//* 2) Route Handlers

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
    if (req.params.id >= tours.length || req.params.id < 0) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID',
        });
    }

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
    if (req.params.id >= tours.length || req.params.id < 0) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID',
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour: '<Update tour here...>',
        },
    });
}

function deleteTour(req, res) {
    if (req.params.id >= tours.length || req.params.id < 0) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID',
        });
    }

    res.status(204).json({
        status: 'success',
        data: null,
    });
}

function getAllUsers(req, res) {
    res.status(500).json({
        status: 'error',
        message: 'This route has not beed defined yet',
    });
}

function getUser(req, res) {
    res.status(500).json({
        status: 'error',
        message: 'This route has not beed defined yet',
    });
}

function createUser(req, res) {
    res.status(500).json({
        status: 'error',
        message: 'This route has not beed defined yet',
    });
}

function updateUser(req, res) {
    res.status(500).json({
        status: 'error',
        message: 'This route has not beed defined yet',
    });
}

function deleteUser(req, res) {
    res.status(500).json({
        status: 'error',
        message: 'This route has not beed defined yet',
    });
}

//* 3) Routes

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

const tourRouter = express.Router();
const userRouter = express.Router();

tourRouter.route('/').get(getAllTours).post(createTour);
tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

//* 4) Server

const PORT = 3000;
app.listen(PORT, (req, err) => {
    console.log(`App is running on port: ${PORT}`);
});
