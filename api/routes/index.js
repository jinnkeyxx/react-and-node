// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
const JwtMdw = require('../middlewares/jwt');

// module.exports = router;
module.exports = (app) => {
  
  app.use('/friend', JwtMdw, require('./friend'));

  app.use('/post', JwtMdw, require('./post'));

  app.use('/profile', JwtMdw, require('./profile'));

  app.use('/auth', require('./auth'));

  app.get("/", (req, res, next) => {
    res.render("index", { title: "Express" });
  });
};
