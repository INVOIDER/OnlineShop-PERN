//Подключаем модуль express
const express = require('express')
const fileUpload = require('express-fileupload')
const path = require('path')
const cors = require('cors')

require('dotenv').config() //Подключаем библиотеку переменных окружения
const {pool} = require("./db") //Подключаем файл для бд
const router = require("./routes/router") //Подключаем главный роутер
const errorHandler = require('./middleware/ErrorHandler') //Подключаем обработчик ошибок
const PORT = process.env.PORT || 5000;

const server = express() // Создание экземпляра express

server.use(cors())
server.use(express.json())
server.use(express.static(path.resolve(__dirname,'static'))); //Имя папки где хранятся статические файлы
server.use(fileUpload({}))
server.use('/api', router) // Запуск роутера по заданному адресу
server.use(errorHandler) //Подключаем обработчик ошибок
server.listen(PORT,() =>{
    console.log(`Сервер запущен на порту ${PORT}`);
    pool.connect()
    console.log('DB_HOST',process.env.DB_HOST)
});

server.get('/', function (req, res){
    try{
        console.log('load /')
        res.render('index.html');
    }
    catch (e)
    {
        res.end("Page not found 404")
    }
});