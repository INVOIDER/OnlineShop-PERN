const Router = require("express")
const router = new Router()
const productController = require('../controllers/product_controller')
const checkRoleHandler = require("../middleware/checkRoleHandler");

router.post('/',checkRoleHandler('Admin'),productController.create)
router.get('/',productController.getAll)
router.get('/:id',productController.getOne)
router.delete('/:id',checkRoleHandler('Admin'),productController.deleteOne)
router.patch('/:id',checkRoleHandler('Admin'),productController.changeOne)
module.exports = router
