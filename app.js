var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var lusca = require('lusca');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
const ejs=require("ejs")
var session = require('express-session');
var mysql = require('mysql2');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",database:"lafleur"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  app.db=con
});
var FileStore = require('session-file-store')(session);
var fileStoreOptions = {};
 
app.use(session({
  key: 'session_cookie_name',
  secret: 'session_cookie_secret',
  store: new FileStore(fileStoreOptions),
  resave: true,

  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true
  }
}))

app.use(lusca.csrf());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', (path, data, cb) => {
  ejs.renderFile(path, data, {}, cb);
})
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
