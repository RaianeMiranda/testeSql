const mysql      = require('mysql2');
const connection = mysql.createConnection({
  host     : '34.151.200.120',
  port     : 3000,
  user     : 'raiane',
  password : 'adm1123',
  database : 'docks'
});

connection.connect((err) => {
  if(err) return console.log(err);
  console.log('conectou!');
})
// Sample code with mysql
// var Sequelize = require('sequelize');
// var mysql = require('mysql2/promise');
// var connection = mysql.createConnection({
//     host: '34.151.200.120',
//     user: 'raiane',
//     password: 'adm1123',
//     database: 'docks',
// });

// connection.connect();

// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('The solution is: ', results[0].solution);
// });

// connection.end();

// export default mysql;
// module.exports = Sequelize;