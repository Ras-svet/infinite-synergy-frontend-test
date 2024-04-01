const globalError = (err, req, res, next) => {
  const { statusCode , message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? "На сервере произошла ошибка" : message,
  });

  next();
};

module.exports = globalError;