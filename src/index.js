const express = require('express');
require('./db/mongoose');


const productRouter = require('./router/product');
const app =express();

app.use(express.json());
app.use(productRouter);

app.listen(3000,()=>{
    console.log('listening');
})