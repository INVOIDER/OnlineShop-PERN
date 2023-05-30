//Данный файл-роутер перенаправляет на другие роутеры
const Router = require('express')
const router = new Router()

const userRouter = require("./user_router")
const productRouter = require("./product_router")
const typeRouter = require("./type_router")
const brandRouter = require("./brand_router")
const cartRouter = require("./cart_router")

router.use('/user', userRouter) //Перенаправляет на страницу роутера пользователя
router.use('/type',typeRouter)
router.use('/device',productRouter)
router.use('/brand',brandRouter)
router.use('/cart',cartRouter)


module.exports = router