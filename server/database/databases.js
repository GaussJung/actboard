const mysql = require('mysql'); // mysql사용
//db정보
const dbConnection = mysql.createPool(
    {
    host: '15.164.154.160',
    user: 'appdev',
    password: 'appdev12!',
    database: 'appsvcdb',
    dateStrings:'date'
    }
); 

module.exports = dbConnection