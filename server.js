const app = require('./app');

const PORT = 3000;

app.listen(PORT, (req, err) => {
    console.log(`App is running on port: ${PORT}`);
});
