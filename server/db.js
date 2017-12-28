
const mysql = require('mysql');

module.exports = (sql, callback) => {
	const db = mysql.createConnection({
        host : 'localhost',
        user : 'root',
        password : 'password',
        database : 'tour'
    });

    db.connect();
    db.query(sql, callback);
	db.end();
};
