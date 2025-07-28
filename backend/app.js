const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./models');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger/swagger-output.json');
require('dotenv').config()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const recruitRouter = require('./routes/recruit');
const studyRouter = require('./routes/study');
const adminRouter = require('./routes/admin');


db.sequelize
    .sync()
    .then(()=> {
        console.log('DB 연결 성공...');
    })
    .catch((err) => {
        console.error(err);
    });


app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get('/', (req, res) => {
    res.status(200).json({message:'running...'});
});



app.use('/recruit', recruitRouter);
app.use('/study', studyRouter);
app.use('/admin', adminRouter);



module.exports = app;