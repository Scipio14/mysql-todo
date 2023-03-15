const mysql = require('mysql');
require('dotenv').config();

const con = mysql.createConnection({
  host:process.env.HOST,
  user:process.env.USER, 
  password:process.env.PASSWORD,
  database:process.env.DATABASE
});

con.connect((err)=>{
  if(err) throw err;
  console.log("Database connected successfully")
});

module.exports = con;
