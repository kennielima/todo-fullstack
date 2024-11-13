import mysql from 'mysql2';
import 'dotenv/config'; 

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.getConnection((err, connection) => {
    if (err) {
        return console.log("db error", err);
    }
    console.log('Database connected successfully');
    connection.release();
});

// db.connect((err) => {
//     if (err) {
//         console.error('Error connecting to the database:', err);
//         return;
//     }
//     console.log('Connected to the database!');
// });

export default db;
