const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  userId: {
    type: Number,
    unique: true,
    required: true
  },
	email: {
		type: String,
    unique: true,
    required: [true, 'Поле "email" должно быть заполнено'],
    validate: {
      validator: (v) => validator.isEmail(v),
      message: () => 'Некорректный email',
    },
	},
	firstName: {
		type: String,
		required: [true, 'Поле "имя" должно быть заполнено'],
	},
	lastName: {
		type: String,
		required: [true, 'Поле "фамилия" должно быть заполнено'],
	},
	age: {
    type: Number,
    required: [true, 'Поле "возраст" должно быть заполнено'],
  }
}, { versionKey: false })

module.exports = mongoose.model('user', userSchema);