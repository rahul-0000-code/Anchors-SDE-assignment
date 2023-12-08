const mongoose = require('mongoose');
require('dotenv').config()
mongoose.connect(process.env.DB_URL).then(()=>{
    console.log("mongo is connected")
}).catch((e)=>{
    console.log('error:',e)
})
