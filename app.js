
const express=require('express');
const app=new express();

const api=require('./routes/sample');

const morgan=require('morgan');
app.use(morgan('dev'));

app.use('/api',api);

const bodyParser = require('body-parser');
app.use(bodyParser.json());

require('dotenv').config();
const PORT=process.env.PORT;
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
});