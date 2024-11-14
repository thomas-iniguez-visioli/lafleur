var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', users:[
    {
    link:"/",name:"bulbe"
  },{
    link:"/",name:"bulbe2"
  }
] });
});

module.exports = router;
