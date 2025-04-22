var express = require("express");
var router = express.Router();
const fs = require("fs");
const rateLimit = require("express-rate-limit");
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 2000, // limit each IP to 100 requests per window
  handler: (req, res, next, options) =>{
    console.log(req.ip.split(":")[req.ip.split(":").length-1])
    req.app.blocklist.addAddress(req.ip.split(":")[req.ip.split(":").length-1])
    req.app.blocklist.saveToFile()
    res.status(options.statusCode).send(options.message)
  }
		
});

router.use(limiter);

/* GET home app.page. */
router.use("/*",function (req, res, next) {
  //console.log(app.page)
  //console.log(app.produit)
  fs.writeFileSync("./sessions/d.json",JSON.stringify(req.app.produit,null,2))
  req.app.updatedb()
  
  next();
});
router.get("/", function (req, res, next) {
 

  //console.log(results)
  res.render("index", { title: "Express", users: req.app.page });
});
router.get("/produit/:fleur", function (req, res, next) {
  //console.log(app.produit);
  console.log("les paramètre sont :" + JSON.stringify(req.params));
  console.log(req.app.produit[req.params.fleur])
 
  res.render("bulbe", {
    title: "Express",
    users: req.app.page,
    produit: req.app.produit[req.params.fleur],
  });
});
var errormsg=""
router.get("/contact", function (req, res, next) {
  res.render("contact", { title: "app.page de contact", users: req.app.page,message:errormsg });
});

router.post("/contact", function (req, res, next) {
  try {
    console.log();
    console.log(req.session.id);
    if(req?.body?.message.length<10){
      res.redirect("/contact")
      errormsg="texte trop court "
      return
    }
    fs.appendFileSync(
      "./contact",
      `[${req.body.mail}:(${req.session.id})]:${req.body.message}\n`
    );
    res.redirect("/");
  } catch (error) {
    console.log(error)
  }

});
module.exports = router;
