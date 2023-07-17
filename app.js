const express = require('express');

const app = express();

app.use(express.json());

// !Deprecated
// app.get('/', (req, res) => {
//     res.status(200).json({
//         message: 'Hello from the other side!',
//         app: 'Natours',
//     });
// });

// app.post('/', (req, res) => {
//     res.send('You can add to this endpoint');
// });

const fs = require('fs');
const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours,
        },
    });
});

app.post('/api/v1/tours', (req, res) => {
    const newTourId = tours.length;
    const newTour = Object.assign({ id: newTourId }, req.body);

    tours.push(newTour);
    console.log(tours);

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
});

const PORT = 3000;
app.listen(PORT, (req, err) => {
    console.log(`App is running on port: ${PORT}`);
});
