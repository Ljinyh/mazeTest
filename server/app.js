const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require("body-parser");
const { sequelize } = require('./models');
require('dotenv').config();

const app = express();

// DB 연결상태
sequelize.sync({ force: false })
    .then(() => {
        console.log("DB Connected Success");
    })
    .catch((err) => {
        console.log(err);
    });

// cors option
const corsOptions = {
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"]
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 최상위
app.get('/', (req, res) => {
    res.status(200).send('Backend server');
});

// router
app.use('/api', require('./router/userRouter'));

//Error middleware
app.use(function (error, req, res, next) {
    console.log(error);
    res.send({
        errorMessage: error.message,
    });
});

app.listen(process.env.PORT, () => {
    console.log(process.env.PORT, '포트로 서버가 켜졌어요!');
});