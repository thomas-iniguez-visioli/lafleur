var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var lusca = require('lusca');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const net=require("net")
const bl=new net.BlockList()

var app = express({BlockList:bl});
app.page=[]
app.produit={}

const ejs=require("ejs")
var session = require('express-session');
var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",database:"lafleur"
});
app.db=con
con.connect(function(err) {

   
  
});
  app.updatepage=()=>{
    return new Promise((resolve, reject) => {
      try {
        con.query(
          { sql: "SELECT * FROM `categorie` " },
          function (error, results, fields) {
           /* console.log(
              "les donnée sont :" +
                error +
                "\n" +
                JSON.stringify(results, null, 2) 
            );*/
            results.forEach((item, i) => {
              app.page[i] = {
                link: `/produit/${item.cat_libelle}`,
                name: item.cat_libelle,
                data: item.cat_code,
              };
              app.produit[item.cat_libelle] = [];
             
              return {
                link: `/app.produit/${item.cat_libelle}`,
                name: item.cat_libelle,
              };
            });
            resolve()
          }
        );
        
      } catch (error) {
        reject(error)
      }
    

    })
   
    
  
  }
  app.updateproduit=()=>{
    return new Promise((resolve, reject) => {
      try {
    app.page.forEach((item)=>{
      //console.log(item)
     // console.log(app.page)
      app.produit[item.cat_libelle]=[]
      if (app.produit[item.name].length == 0) {
        app.db.query(
          { sql: "SELECT * FROM `produit` WHERE pdt_categorie = \"" + item.data+"\"" },
          function (error, results, fields) {
           /* console.log(
              "les donnée sont :" +
                error +
                "\n" +
                JSON.stringify(results, null, 2) );**/
                
            
            results.map((ite, i) => {
             // console.log(ite)
              app.produit[item.name][i] = ite;
              return {
                link: `/${item.cat_libelle}`,
                name: item.cat_libelle,
              };
            });
          }
        );
      }
    })
    resolve()
  } catch (error) {
    reject(error)
  }


})
  }
   app.updatedb=()=>{
    app.updatepage().then(()=>{
      app.updateproduit()
    })
   }
  

var FileStore = require('session-file-store')(session);
var fileStoreOptions = {};
 
app.use(session({
  key: 'session_cookie_name',
  secret: 'session_cookie_secret',
  store: new FileStore(fileStoreOptions),
  resave: false,

  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true
  }
}))

//app.use(lusca.csrf());

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
app.updatedb()
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
