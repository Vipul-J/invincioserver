const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
require('dotenv').config();
const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

module.exports = db;

// Create table if not exists
const createTableQuery = `
    CREATE TABLE IF NOT EXISTS registration (
        id INT AUTO_INCREMENT PRIMARY KEY,
        college VARCHAR(255) NOT NULL,
        facultyName VARCHAR(255) NOT NULL,
        facultyNumber VARCHAR(20) NOT NULL,
        codingParticipantOne VARCHAR(255) NOT NULL,
        codingOne VARCHAR(20) NOT NULL,
        codingParticipantTwo VARCHAR(255) NOT NULL,
        codingTwo VARCHAR(20) NOT NULL,
        designingParticipantOne VARCHAR(255) NOT NULL,
        designOne VARCHAR(20) NOT NULL,
        designingParticipantTwo VARCHAR(255) NOT NULL,
        designTwo VARCHAR(20) NOT NULL,
        communicationParticipantOne VARCHAR(255) NOT NULL,
        commOne VARCHAR(20) NOT NULL,
        communicationParticipantTwo VARCHAR(255) NOT NULL,
        commTwo VARCHAR(20) NOT NULL,
        gamingParticipant VARCHAR(255) NOT NULL,
        gameOne VARCHAR(20) NOT NULL,
        hackathonParticipantOne VARCHAR(255) NOT NULL,
        hackOne VARCHAR(20) NOT NULL,
        hackathonParticipantTwo VARCHAR(255) NOT NULL,
        hackTwo VARCHAR(20) NOT NULL,
        hackathonParticipantThree VARCHAR(255) NOT NULL,
        hackThree VARCHAR(20) NOT NULL,
        utrNumber VARCHAR(255) NOT NULL 
    )
`;

db.query(createTableQuery, (err, result) => {
    if (err) {
        throw err;
    }
    console.log('Table created or already exists...');
});

// API endpoint to handle form submissions (POST request)
app.post('/register', (req, res) => {
    const data = req.body;

    // Insert data into MySQL
    const insertQuery = 'INSERT INTO registration SET ?';

    db.query(insertQuery, data, (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error registering team' });
            throw err;
        }
        res.status(200).json({ message: 'Team registered successfully' });
    });
});

// API endpoint to retrieve all registered teams (GET request)
app.get('/registerations', (req, res) => {
    const selectQuery = 'SELECT * FROM registration';

    db.query(selectQuery, (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error fetching teams' });
            throw err;
        }
        res.status(200).json(result);
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
