const express = require('express')
const router = express.Router();
const NotFoundError = require('../errors/not-found-error');

const userRoutes = require('./users')

router.use('/users', userRoutes);
router.use('*', (req, res, next) => {
  next(new NotFoundError('Запрос отправлен по неправильному URL'));
});

module.exports = router;