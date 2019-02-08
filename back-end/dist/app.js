let mongo = require('mongodb');
let express = require('express');
let userRouter = require('./routers/user');
let systemOptionsRouter = require('./routers/systemOptions');
let reserve = require('./routers/Reserve');
let cookieParser = require('cookie-parser');
let expressSession = require('express-session');
var MemoryStore = require('memorystore')(expressSession);
var date = new Date();
date.setDate(date.getDate() + 5);
let session = expressSession({
    secret: "sdfsdSDFD5sf4rt4egrt4drgsdFSD4e5",
    resave: true,
    saveUninitialized: false,
    store: new MemoryStore(),
    cookie: {
        secure: false,
        maxAge: date
    }
});
let bodyParser = require('body-parser');
let sharedsession = require("express-socket.io-session");
const app = express();
var server = require('http').Server(app);
let io = require('socket.io')(server);
server.listen(3001);
let sockets = new Set();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session);
io.use(sharedsession(session));
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
app.listen(3000, function () {
    console.log('Server is run!');
});
userRouter(app);
systemOptionsRouter(app);
reserve(app, io, sockets);
