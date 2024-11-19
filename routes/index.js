var express = require('express');
var router = express.Router();
const page =[
  {
  link:"/bulbe",name:"Bulbe"
},{
  link:"/massif",name:"Massif"
},{
  link:"/rosiers",name:"Rosiers"
}
]
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', users:page });
});router.get('/bulbe', function(req, res, next) {
  res.render('bulbe', { title: 'Express', users:page,produit:[
  {
    photo:"/images/bulbes_begonia.jpg",
    reference:"b01",
    designation:"3 bulbes de bégonia",
    prix:5
  }, {
    photo:"/images/bulbes_dahlia.jpg",
    reference:"b02",
    designation:"10 bulbe de dalhias",
    prix:12
  }, {
    photo:"/images/bulbes_glaieul.jpg",
    reference:"b03",
    designation:"50 glaieul",
    prix:9
  }
]});
});router.get('/massif', function(req, res, next) {
  res.render('bulbe', { title: 'Express', users:page,produit:[
  {
    photo:"/images/massif_marguerite.jpg",
    reference:"m01",
    designation:"lot de 3 marguerite",
    prix:5
  }, {
    photo:"/images/massif_pensee.jpg",
    reference:"m02",
    designation:"pour un bouquet de 6 pensée ",
    prix:6
  }, {
    photo:"/images/massif_melange.jpg",
    reference:"m03",
    designation:"mélange variée de 10 plante a massif",
    prix:15
  }
]});
});router.get('/rosiers', function(req, res, next) {
  res.render('bulbe', { title: 'Express', users:page,produit:[
  {
    photo:"/images/rosiers_gdefleur.jpg",
    reference:"r01",
    designation:"un pied spécial grandes fleur ",
    prix:20
  }, {
    photo:"/images/rosiers_parfum.jpg",
    reference:"r02",
    designation:"une variété séléctionée pour son parfum",
    prix:9
  }, {
    photo:"/images/rosiers_arbuste.jpg",
    reference:"r03",
    designation:"rosiers arbuste",
    prix:8
  }
]});
});

module.exports = router;
