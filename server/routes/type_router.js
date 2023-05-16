const Router = require("express")
const router = new Router()
const typeController = require('../controllers/type_controller')
const checkRoleHandler = require('../middleware/checkRoleHandler')

router.post('/',checkRoleHandler('Admin'),typeController.create)
router.get('/',typeController.getAll)
router.patch('/:id',checkRoleHandler('Admin'),typeController.changeOne)
router.delete('/:id',checkRoleHandler('Admin'),typeController.deleteOne)

module.exports = router
