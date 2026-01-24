const db = require("../config/db");

class FavoriteRepository {
    listByUser(userId) {
        return new Promise((resolve, reject) => {
            db.all(
                `SELECT * FROM Favorites WHERE userId = ? ORDER BY id DESC`,
                [userId],
                (err, rows) => {
                    if (err) return reject(err);
                    resolve(rows || []);
                }
            );
        });
    }

    add({ userId, videoId, title, thumbnailUrl }) {
        const createdAt = new Date().toISOString();
        return new Promise((resolve, reject) => {
            db.run(
                `INSERT INTO Favorites (userId, videoId, title, thumbnailUrl, createdAt)
         VALUES (?, ?, ?, ?, ?)`,
                [userId, videoId, title, thumbnailUrl, createdAt],
                function (err) {
                    if (err) return reject(err);
                    resolve({ id: this.lastID, userId, videoId, title, thumbnailUrl, createdAt });
                }
            );
        });
    }

    remove({ userId, videoId }) {
        return new Promise((resolve, reject) => {
            db.run(
                `DELETE FROM Favorites WHERE userId = ? AND videoId = ?`,
                [userId, videoId],
                function (err) {
                    if (err) return reject(err);
                    resolve(this.changes);
                }
            );
        });
    }
}

module.exports = new FavoriteRepository();
