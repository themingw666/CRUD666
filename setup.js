require('dotenv').config();
const pool = require("./config/connection");

const dropTable = `DROP TABLE IF EXISTS "items";`;

const queryTable = `
    CREATE TABLE "items" (
        "id" SERIAL PRIMARY KEY,
        "name" VARCHAR(100) NOT NULL,
        "description" TEXT NOT NULL,
        "price" INTEGER NOT NULL,
        "quantity" INTEGER NOT NULL,
        "is_active" BOOLEAN NOT NULL
    );
`;

pool.query(dropTable, (err, result) => {
    if(err){
        throw err;
    } else {
        console.log("DROP TABLE SUCCESS");
        pool.query(queryTable, (err, result) => {
            if(err){
                throw err;
            } else {
                console.log("CREATE TABLE SUCCESS");
                
                // Optional: Insert seed data
                const seedData = `
                    INSERT INTO "items" (name, description, price, quantity, is_active)
                    VALUES 
                    ('Sample Item 1', 'Description for item 1', 1000, 10, true),
                    ('Sample Item 2', 'Description for item 2', 2500, 5, false);
                `;
                pool.query(seedData, (err, res) => {
                    if(err) {
                        console.log("SEED ERROR: ", err);
                    } else {
                        console.log("SEED DATA INSERTED");
                    }
                    pool.end();
                });
            }
        });
    }
});