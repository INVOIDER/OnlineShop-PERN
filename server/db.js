const Pool = require('pg').Pool //Реализация подключения к бд с помощью pool
require('dotenv').config() //Подключаем библиотеку переменных окружения
const pool = new Pool({
    connectionString: process.env.CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false // Необязательно, если вы используете самоподписанный сертификат
    }
})
module.exports = {pool}