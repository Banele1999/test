var mysql = require("mysql");
/*
//Create Connections
var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: '',
    database: "hackacity"
})*/

var mysqlConnection = mysql.createConnection({
    host: "sql8.freemysqlhosting.net",
    user: "sql8669541",
    password: 'EdvBgRv8sW',
    database: "sql8669541",
    port: '3306'
})

//connect to database
mysqlConnection.connect((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('connection succeded');
    }
    //mysqlConnection.end();
})


module.exports = mysqlConnection;