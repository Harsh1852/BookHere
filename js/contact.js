// Install Packages
const mysql = require('mysql');

// Connection Details
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'your_username',
  password: 'your_password',
  database: 'your_database'
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
const query = 'SELECT name, email, phone, address, message FROM contact';
connection.query(query, (err, results) => {
  if (err) {
    console.error('Error executing query: ', err);
    return;
  }
  console.log('Fetched data:', results);
  // Pass the results to a function for further processing
  displayData(results);
});

// Display the data
function displayData(data) {
  const container = document.getElementById('data-container');
  data.forEach((row) => {
    const rowElement = document.createElement('div');
	rowElement.classList.add('custom-card');
    rowElement.innerHTML = `
      <p><span><b>Name:</b> ${row.name}</span></p>
      <p><span><b>Email:</b> ${row.email}</span></p>
      <p><span><b>Phone:</b> ${row.phone}</span></p>
      <p><span><b>Address:</b> ${row.address}</span></p>
      <p><span><b>Message:</b> ${row.message}</span></p>
      <hr>
    `;
    container.appendChild(rowElement);
  });
}

