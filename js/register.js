// Install Packages
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const saltRounds = 10; // Number of salt rounds for bcrypt (adjust as needed)

// Connection Details
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'sharma@18',
  database: 'bookhere'
});

// Connect to database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ', err);
    return;
  }
  console.log('Connected to MySQL database!');
});

// Get Contact Info
const myButton = document.getElementById('signup-button');

myButton.addEventListener('click', function() {
    const plaintextName = document.getElementById('name');
    const plaintextPhone = document.getElementById('phone');
    const plaintextEmail = document.getElementById('email');
    const plaintextPassword = document.getElementById('password');

    bcrypt.hash(plaintextPassword, saltRounds, function(err, hash) {
        if (err) {
            console.error('Error hashing password:', err);
        } else {
            // Store the hash in the database
            INSERT INTO customer_info (name, email, phone, password) VALUES (plaintextName, plaintextEmail, plaintextPhone, hash);
            const query = 'INSERT INTO customer_info (name, email, phone, password) VALUES (?, ?, ?, ?)';
            const values = [plaintextName, plaintextEmail, plaintextPhone, hash];
            connection.query(query, values, (err, result) => {
              if (err) {
                console.error('Error inserting data: ', err);
                return;
              }
              console.log('Data inserted successfully!');
            });
        }
    });
});
