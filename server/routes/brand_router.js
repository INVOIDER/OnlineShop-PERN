const Router = require("express")
const router = new Router()
const brandController = require('../controllers/brand_controller')
const checkRoleHandler = require("../middleware/checkRoleHandler");

router.post('/',checkRoleHandler('Admin'),brandController.create)
router.get('/',brandController.getAll)
router.patch('/:id',checkRoleHandler('Admin'),brandController.changeOne)
router.delete('/:id',checkRoleHandler('Admin'),brandController.deleteOne)
module.exports = router
