const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const { sequelize } = require('./models');
require('dotenv').config();

const app = express();

sequelize.sync({ force: false })
    .then(() => {
        console.log("DB Connected Success");
    })
    .catch((err) => {
        console.log(err);
    });


const corOptions = {
    origin: "",
};

app.use(cors(corOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 최상위
app.get('/', (req, res) => {
    res.status(200).send('Backend server');
});
app.use('/api', require('./router/userRouter'));

//Error middleware
app.use(function (error, req, res, next) {
    res.status(200).json({
        message: error.message,
    });
});

app.listen(process.env.PORT, () => {
    console.log(process.env.PORT, '포트로 서버가 켜졌어요!');
});