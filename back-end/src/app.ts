let mongo = require('mongodb');
let express = require('express');
let userRouter = require('./routers/user');
let systemOptionsRouter = require('./routers/systemOptions');
let cookieParser = require('cookie-parser');
let expressSession = require('express-session');
let bodyParser = require('body-parser');
var MemoryStore = require('memorystore')(expressSession)

const app = express()

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());



app.use(expressSession({
    secret: "sdfsdSDFD5sf4rt4egrt4drgsdFSD4e5", 
    store: new MemoryStore(), 
    resave : true,
    saveUninitialized : true,
    cookie:
    { 
        secure: false ,
        maxAge  : new Date(Date.now() + (60 * 1000 * 30))
    }
}));
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', "http://localhost:4200");

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.listen(3000, function(){
    console.log('Server is run!');
});

userRouter(app);
systemOptionsRouter(app);