const pool = require("../config/connection");

class Item {
    static showAll(cb) {
        pool.query('SELECT * FROM "items" ORDER BY id ASC', (err, res) => {
            cb(err, res ? res.rows : null);
        });
    }

    static addPost(obj, cb) {
        const { name, description, price, quantity, is_active } = obj;
        const query = `INSERT INTO "items" (name, description, price, quantity, is_active) VALUES ($1, $2, $3, $4, $5)`;
        pool.query(query, [name, description, price, quantity, is_active === 'true'], cb);
    }

    static editForm(id, cb) {
        pool.query(`SELECT * FROM "items" WHERE id = $1`, [id], (err, res) => {
            cb(err, res && res.rows.length ? res.rows[0] : null);
        });
    }

    static editPost(id, obj, cb) {
        const { name, description, price, quantity, is_active } = obj;
        const query = `UPDATE "items" SET name=$1, description=$2, price=$3, quantity=$4, is_active=$5 WHERE id=$6`;
        pool.query(query, [name, description, price, quantity, is_active === 'true', id], cb);
    }

    static delete(id, cb) {
        pool.query(`DELETE FROM "items" WHERE id = $1`, [id], cb);
    }
}

module.exports = Item;