//Подключаем модуль express

const express = require('express')
const server = express() // Создание экземпляра express
require('dotenv').config() //Подключаем библиотеку переменных окружения


const PORT = process.env.PORT || 3000;
server.use(express.static('./client')); //Имя папки где хранится система

server.listen(PORT,() =>{
    console.log(`Сервер запущен на порту ${PORT}`);
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