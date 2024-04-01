const { celebrate, Joi } = require('celebrate');

const validationCreateUser = celebrate({
  body: Joi.object().keys({
    userId: Joi.number().required(),
		firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required().email(),
    age: Joi.number().required()
  }),
});

const validationUpdateUser = celebrate({
  body: Joi.object().keys({
    userId: Joi.number().required(),
		firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required().email(),
    age: Joi.number().required()
  }),
});

module.exports = {
  validationCreateUser,
  validationUpdateUser
}