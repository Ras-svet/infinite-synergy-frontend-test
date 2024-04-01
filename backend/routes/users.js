const router = require('express').Router();
const { createUser, updateUser, getUsers, getUsersByPackets } = require('../controllers/users')
const { validationCreateUser, validationUpdateUser } = require('../middlewares/validator')

router.get('/', getUsers)
router.get('/:pageNumber/:size', getUsersByPackets)
router.post('/', validationCreateUser, createUser)
router.patch('/:userId', validationUpdateUser, updateUser)

module.exports = router;