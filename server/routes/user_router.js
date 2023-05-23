const Router = require("express")
const router = new Router()
const user_controller = require("../controllers/user_controller")
const authHandler = require("../middleware/authHandler")

router.post('/reg',user_controller.registration)
router.post('/login',user_controller.login)
router.get('/auth',authHandler,user_controller.checkUser)
router.get('/getAll',user_controller.getUsers) //Тестовая функция
router.patch('/update',authHandler,user_controller.updateUser)
router.delete('/delete',authHandler,user_controller.deleteUser)

module.exports = router
