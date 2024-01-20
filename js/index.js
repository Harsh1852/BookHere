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
const myButton = document.getElementById('login-button');

myButton.addEventListener('click', function() {
  // Get the username and password from the login page
  const username = document.getElementById('username');
  const password = document.getElementById('password');

  connection.query('SELECT * FROM users WHERE username = ?', [username], function(err, results) {
      if (err) {
          console.error('Error querying database:', err);
          alert('Error querying database:', err);
      } else {
          if (results.length === 1) {
              const storedPassword = results[0].password;
              
              bcrypt.compare(password, storedPassword, function(err, match) {
                  if (err) {
                      console.error('Error comparing passwords:', err);
                      alert('Error comparing passwords:', err);
                  } else if (match) {
                      console.log('Authentication successful');
                      // Proceed with the user's authenticated session
                  } else {
                      console.log('Incorrect password');
                      alert('Incorrect password');
                      // Display an error message to the user
                  }
              });
          } else {
              console.log('User not found');
              alert('User not found');
              // Display an error message to the user
          }
      }

      connection.close();
  });
});
