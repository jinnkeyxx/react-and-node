const {helper, xss, jwt, bcrypt} = require('../config/autoload');
const {userModel} = require('../models/autoload');
class friendController{

    offer(req, res, next) {
        res.status(200).json({status: true, data: req.payload});
    }

}
module.exports = new friendController();