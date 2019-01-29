let mongo = require('mongodb');
let express = require('express');
let userRouter = require('./routers/user');
const app = express()

app.listen(3000, function(){
    console.log('Server is run!');
});

userRouter(app);