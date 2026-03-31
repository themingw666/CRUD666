require('dotenv').config();
const express = require("express");
const routes = require("./routes");
const PORT = process.env.PORT || 3000;
const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.use(routes);

const server = app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});

process.on('SIGINT', () => {
    console.log('SIGINT signal received: forcing exit');
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: forcing exit');
    process.exit(0);
});