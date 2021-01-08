module.exports = {
    helper: require('../plugins/helper'),
    xss: require('xss'),
    jwt: require('jsonwebtoken'),
    bcrypt: require('bcrypt'),
    md5: require('md5'),
    ObjectID: require('mongodb').ObjectID,
}