const express = require('express');
const app = express();
const path = require('path');
const db = require('mysql2');

// Create a connection to the database
const connection = db.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'praktikum123',
    database: 'soc'
});

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database.');
});
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../FE/index.html'));
});

app.post('/', (req, res) => {
    const { name, date, time } = req.body;
    // try catch block untuk menangani error saat menyimpan data booking
    try {
        const fs = require('fs');
        const bookingData = `Name: ${name}, Date: ${date}, Time: ${time}\n`;
        console.log(`Received booking: ${bookingData}`);

        // then redirect to jadwal.html after successful booking
        res.status(200).json({ message: 'Booking successful!' });
    } catch (error) {
        console.error('Error processing booking:', error);
        return res.status(500).json({ message: 'An error occurred while processing your booking. Please try again.' });
    }
});
app.get('/jadwal.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../FE/jadwal.html'));
});

// Style and script files
app.get('/style.css', (req, res) => {
    res.sendFile(path.join(__dirname, '../FE/style.css'));
});

app.get('/script.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../FE/script.js'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
