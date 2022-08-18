const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/productassignment').catch((err)=>{
    console.log(err);
})