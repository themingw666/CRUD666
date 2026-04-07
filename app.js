require('dotenv').config();
const express = require("express");
const routes = require("./routes");
const pool = require("./config/connection");

const PORT = process.env.PORT || 3000;
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(routes);

const startServer = async () => {
    let isConnected = false;

    while (!isConnected) {
        try {
            console.log("Checking database connection (timeout 10s)...");
            await pool.query("SELECT 1");
            console.log("Database connected successfully.");
            isConnected = true;
        } catch (error) {
            console.error("Database connection failed. Retrying in 10 seconds...", error.message);
            await new Promise(resolve => setTimeout(resolve, 10000));
        }
    }

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
};

startServer();
