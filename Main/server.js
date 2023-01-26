// import express
const express = require('express');
// // Import and require mysql2
// const mysql = require('mysql2');
// // import console table 
// const consoleTable = require('console.table');
// import dotenv
require('dotenv').config();

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});