var express = require('express');
var router = express.Router();
const page =[
  {
  link:"/bulbe",name:"bulbe"
},{
  link:"/massif",name:"massif"
},{
  link:"/rosiers",name:"rosiers"
}
]
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', users:page });
});router.get('/bulbe', function(req, res, next) {
  res.render('bulbe', { title: 'Express', users:page,produit:[
  {
    photo:"/images/bulbes_begonia.jpg",
    reference:"1",
    designation:"bégonia",
    prix:0
  }, {
    photo:"/images/bulbes_dahlia.jpg",
    reference:"1",
    designation:"dahlia",
    prix:0
  }, {
    photo:"/images/bulbes_glaieul.jpg",
    reference:"1",
    designation:"glaieul",
    prix:0
  }
]});
});router.get('/massif', function(req, res, next) {
  res.render('bulbe', { title: 'Express', users:page,produit:[
  {
    photo:"/images/bulbes_begonia.jpg",
    reference:"1",
    designation:"bégonia",
    prix:0
  }, {
    photo:"/images/bulbes_dahlia.jpg",
    reference:"1",
    designation:"dahlia",
    prix:0
  }, {
    photo:"/images/bulbes_glaieul.jpg",
    reference:"1",
    designation:"glaieul",
    prix:0
  }
]});
});router.get('/rosiers', function(req, res, next) {
  res.render('bulbe', { title: 'Express', users:page,produit:[
  {
    photo:"/images/bulbes_begonia.jpg",
    reference:"1",
    designation:"bégonia",
    prix:0
  }, {
    photo:"/images/bulbes_dahlia.jpg",
    reference:"1",
    designation:"dahlia",
    prix:0
  }, {
    photo:"/images/bulbes_glaieul.jpg",
    reference:"1",
    designation:"glaieul",
    prix:0
  }
]});
});

module.exports = router;
