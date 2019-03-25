const router = require('express').Router()
const establishmentsController = require('../controllers/establishments')

router.get('/establishments', establishmentsController.index)
router.get('/establishments/:id', establishmentsController.show)

module.exports = router
