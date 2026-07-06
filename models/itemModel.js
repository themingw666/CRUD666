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

    static generateRandom(cb) {
        const adjectives = ['Wireless', 'Mechanical', 'Smart', 'Gaming', 'Portable', 'Ergonomic', 'Super', 'Pro', 'Ultra', 'Mini'];
        const nouns = ['Mouse', 'Keyboard', 'Headphones', 'Monitor', 'Charger', 'Speaker', 'Watch', 'Phone', 'Camera', 'Router'];
        const descriptions = [
            'High quality device with amazing performance.',
            'Best-in-class features for daily use.',
            'Ergonomic design with modern aesthetic.',
            'Built to last with premium materials.',
            'Portable and lightweight, easy to carry.',
            'Top-rated choice by tech experts.'
        ];

        const values = [];
        const params = [];
        let paramIndex = 1;

        for (let i = 0; i < 50; i++) {
            const adj = adjectives[Math.floor(Math.random() * adjectives.length)];
            const noun = nouns[Math.floor(Math.random() * nouns.length)];
            const name = `${adj} ${noun} ${Math.floor(100 + Math.random() * 900)}`;
            
            const desc = descriptions[Math.floor(Math.random() * descriptions.length)];
            const price = Math.floor(100 + Math.random() * 50000);
            const quantity = Math.floor(1 + Math.random() * 100);
            const isActive = Math.random() > 0.3; // 70% active

            values.push(`($${paramIndex}, $${paramIndex+1}, $${paramIndex+2}, $${paramIndex+3}, $${paramIndex+4})`);
            params.push(name, desc, price, quantity, isActive);
            paramIndex += 5;
        }

        const query = `INSERT INTO "items" (name, description, price, quantity, is_active) VALUES ${values.join(', ')}`;
        pool.query(query, params, cb);
    }

    static deleteAll(cb) {
        pool.query('TRUNCATE TABLE "items" RESTART IDENTITY', cb);
    }
}

module.exports = Item;