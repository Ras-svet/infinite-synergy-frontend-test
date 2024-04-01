const User = require('../models/users')
const ValidationError = require('../errors/validation-error');
const NotFoundError = require('../errors/not-found-error');
const CastError = require('../errors/cast-error');
const ConflictError = require('../errors/conflict-error');

module.exports.createUser = async (req, res, next) => {
  try {
    const {
      userId, firstName, lastName, email, age
    } = req.body;
    const newUser = await User.create({
      userId, firstName, lastName, email, age
    });
    res.status(201).send({
      _id: newUser._id,
      userId: newUser.userId,
      group: newUser.group,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
    });
  } catch (err) {
    if (err.code === 11000) {
      return next(new ConflictError('Пользователь c указанной почтой или ID уже есть в системе'));
    } else if (err.name === 'ValidationError') {
      return next(new ValidationError('Переданы некорректные данные при создании пользователя'));
    } else { return next(err); }
  }
};

module.exports.updateUser = (req, res, next) => {
  const { userId, firstName, lastName, email, age } = req.body;
  User.findOneAndUpdate({userId: req.params.userId}, { userId, firstName, lastName, email, age }, { new: true })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному id не найден');
      }
      res.status(201).send(user);
    })
    .catch ((err) => {
      if (err.code === 11000) {
        return next(new ConflictError('Пользователь c указанной почтой или ID уже есть в системе'));
      } else if (err.name === 'ValidationError') {
        return next(new ValidationError('Переданы некорректные данные при создании пользователя'));
      } else { return next(err); }
    })
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => next(err));
}

module.exports.getUsersByPackets = async (req, res, next) => {
  const { pageNumber, size } = req.params;
  try {
    const users = await User.find()
      .skip((pageNumber - 1) * size)
      .limit(size);
    res.json(users);
  } catch (error) {
    return next(error)
  }
}