const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
    '<PASSWORD>',
    process.env.DATABASE_PASSWORD
);
mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('DB connection successfull!');
    });

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'A tour must have a name'],
        unique: true,
    },
    rating: {
        type: Number,
        default: 4.5,
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price'],
    },
});
const Tour = mongoose.model('Tour', tourSchema);
const tour = new Tour({
    name: 'The Park Camper',
    price: 997,
});
tour.save()
    .then((doc) => console.log(doc))
    .catch((err) => console.log('Error 😐', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, (req, err) => {
    console.log(`App is running on port: ${PORT}`);
});
