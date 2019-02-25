var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var data_fetcher=require('./services/data_fetcher');
var db=require('./database/db');
var config=require('./config/config.json')
var session= require('express-session')
var uuid= require('uuid');
var passport=require('passport');
var LocalStrategy= require('passport-local').Strategy;

db.connectToSrv(function(err){
  if(err) console.log(err);
})


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login')
var dataRouter= require('./routes/data')

var app = express();




app.use(session({
  genid: (req) => {
    return uuid() // use UUIDs for session IDs
  },
  secret: config.secret.session,
  resave: false,
  saveUninitialized: true
}))


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/data', dataRouter);
app.use('/login', loginRouter);





module.exports = app;
