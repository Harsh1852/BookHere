// Install Packages
const mysql = require('mysql');

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
const query = 'SELECT name, email, description FROM about_us';
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

  // Calculate the number of rows needed
  const numRows = Math.ceil(data.length / 2);

  // Loop through the rows
  for (let i = 0; i < numRows; i++) {
    const rowElement = document.createElement('div');
    rowElement.classList.add('row');

    // Determine the range of items to display in the current row
    const startIdx = i * 2;
    const endIdx = startIdx + 2;
    const rowData = data.slice(startIdx, endIdx);

    data.forEach((row) => {
      const colElement = document.createElement('div');
      colElement.classList.add('col');
      const cardElement = document.createElement('div');
      cardElement.classList.add('custom-card');
      const imgElement = document.createElement('img');
      imgElement.src = 'images/img.jpg';
      imgElement.alt = '';
      imgElement.classList.add('about-us_image');
      const nameElement = document.createElement('h2');
      nameElement.classList.add('about-us_name');
      nameElement.textContent = row.name;
      const mailElement = document.createElement('h5');
      mailElement.classList.add('about-us_name');
      mailElement.textContent = row.email;
      const descElement = document.createElement('p');
      descElement.classList.add('about-us_desc');
      descElement.textContent = row.description;

      cardElement.appendChild(imgElement);
      cardElement.appendChild(nameElement);
      cardElement.appendChild(mailElement);
      cardElement.appendChild(descElement);
      colElement.appendChild(cardElement);
      container.appendChild(colElement);
    });

    container.appendChild(rowElement);
  };
}

