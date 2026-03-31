const Item = require("../models/itemModel");
const pool = require("../config/connection");

class Controller {

    static home(req, res){
        res.redirect('/items');
    }

    static health(req, res) {
        pool.query('SELECT 1', (err, result) => {
            if (err) {
                res.status(500).json({ status: 'error', message: 'Database connection failed', error: err.message });
            } else {
                res.status(200).json({ status: 'ok', message: 'Database connection is healthy' });
            }
        });
    }

    static async reset(req, res) {
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

        try {
            await pool.query(dropTable);
            await pool.query(queryTable);
            res.status(200).json({ status: 'ok', message: 'Database reset successfully' });
        } catch (err) {
            res.status(500).json({ status: 'error', message: 'Database reset failed', error: err.message });
        }
    }

    static showAll(req, res){
        Item.showAll((err, items) => {
            if(err){
                res.send(err);
            } else {
                res.render("showAll", { items });
            }
        });
    }

    static addForm(req, res){
        res.render("addForm");
    }

    static addPost(req, res){
        Item.addPost(req.body, (err) => {
            if(err){
                res.send(err);
            } else {
                res.redirect("/items");
            }
        });
    }

    static editForm(req, res){
        Item.editForm(req.params.id, (err, item) => {
            if(err){
                res.send(err);
            } else {
                res.render("editForm", { item });
            }
        });
    }

    static editPost(req, res){
        Item.editPost(req.params.id, req.body, (err) => {
            if(err){
                res.send(err);
            } else {
                res.redirect("/items");
            }
        });
    }
    
    static delete(req, res){
        Item.delete(req.params.id, (err) => {
            if(err){
                res.send(err);
            } else {
                res.redirect("/items");
            }
        });
    }
}

module.exports = Controller;