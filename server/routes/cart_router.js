const Router = require("express")
const router = new Router()
const cartController = require('../controllers/cart_controller')
const authHandler = require("../middleware/authHandler");

router.post('/:id',authHandler,cartController.addToCart)
router.get('/',authHandler,cartController.getCart)
router.delete('/',authHandler,cartController.deleteAll)
router.patch('/add/:id',authHandler,cartController.UpdateOne)
router.patch('/reduce/:id',authHandler,cartController.ReduceOne)
router.delete('/:id',authHandler,cartController.DeleteOne)
module.exports = router
