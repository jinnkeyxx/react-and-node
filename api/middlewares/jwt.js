const { jwt } = require('../config/autoload');
const { userModel } = require('../models/autoload');
module.exports = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization;
    if (!token) return res.status(401).json({ error: true, message: 'Deny Access' });
    try {
        let decoded = await jwt.verify(token, process.env.security);
        let User = await userModel.findOne({ _id: decoded._id, username: decoded.username });
        if (!User) return res.status(403).json({ error: true, message: 'Không tìm thấy người dùng' });
        req.payload = User;
        next();
    } catch (error) {
        return res.status(403).json({ error: true, message: 'JWT Token không hợp lệ' });
    }
}