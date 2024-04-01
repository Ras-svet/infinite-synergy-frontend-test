const express = require("express")
const cors = require('cors');
const routes = require('./routes/index');
const helmet = require("helmet")
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const globalError = require('./middlewares/globalError')

const app = express()
const { PORT = 3001, DB_URL = 'mongodb://127.0.0.1:27017/infinite' } = process.env;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());

app.use(cors());

app.use('/', routes);

app.use(errors());
app.use(globalError);

mongoose.connect(DB_URL)
  .then(() => { console.log('Connected to database'); })
  .catch((err) => { console.log(`Erorr ${err.name} ${err.message}`); });

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
});