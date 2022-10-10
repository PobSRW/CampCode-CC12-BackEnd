// const { sequelize } = require('./models');

// sequelize.sync({ alter: true });

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const authRoute = require('./route/authRoute');
const courseRoute = require('./route/courseRoute');
const instructorRoute = require('./route/instructorRoute');
const cartRoute = require('./route/cartRoute');
const errorMiddleware = require('./middlewares/error');

const app = express();

if ((process.env.NODE_ENV = 'development')) {
	app.use(morgan('dev'));
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRoute);
app.use('/course', courseRoute);
app.use('/instructor', instructorRoute);
app.use('/cart', cartRoute);

app.use(errorMiddleware);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Sever is running on port ${port}`));
