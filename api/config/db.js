'use strict';
const mongoose = require('mongoose');
mongoose.connect(process.env.mongodb, { useNewUrlParser: true, useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', function (err) {
    if (err) console.log(err);
});
db.once('open', function () {
    console.log("Kết nối Mongoose thành công!");
});
module.exports = db;