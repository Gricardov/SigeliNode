var mysql = require('mysql');
const fs = require('fs');

//local mysql db connection
var connection = mysql.createConnection({
    host: 'mysql-1412-0.cloudclusters.net',
    port: '10001',
    user: 'sigeli',
    password: 'sigeli',
    database: 'BDSIGELI',
    ssl:{
        ca: fs.readFileSync(__dirname+'/../certs/ca.pem')
    }
});

connection.connect(function (err) {
    if (err) throw err;
});

module.exports = connection;