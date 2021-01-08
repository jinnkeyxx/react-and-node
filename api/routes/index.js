// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;
module.exports = (app) => {
  
  app.use('/auth', require('./auth'));

  app.get("/", (req, res, next) => {
    res.render("index", { title: "Express" });
  });
};
