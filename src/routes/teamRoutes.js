const express = require('express')
const { list, get, create, update, remove } = require('../controllers/teamController')
const { protect, authorize } = require('../middleware/auth')

const router = express.Router()

router.get('/', list)
router.get('/:id', get)
router.post('/', protect, authorize(['admin']), create)
router.put('/:id', protect, authorize(['admin']), update)
router.delete('/:id', protect, authorize(['admin']), remove)

module.exports = router

