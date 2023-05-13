//Данный файл-роутер перенаправляет на другие роутеры
const Router = require('express')
const router = new Router()

const userRouter = require("./user_router")

router.use('/user', userRouter) //Перенаправляет на страницу роутера пользователя

module.exports = router