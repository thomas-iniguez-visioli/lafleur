var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', users:[
    {
    link:"/bulbe",name:"bulbe"
  },{
    link:"/",name:"bulbe2"
  }
] });
});router.get('/bulbe', function(req, res, next) {
  res.render('index', { title: 'Express', users:[
    {
    link:"/bulbe",name:"bulbe"
  },{
    link:"/",name:"bulbe2"
  }
] });
});

module.exports = router;
