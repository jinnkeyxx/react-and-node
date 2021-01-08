const { helper, xss, jwt, bcrypt } = require("../config/autoload");
const { userModel } = require("../models/autoload");
class authController {
  async login(req, res, next) {
    const username = xss(req.body.username);
    const password = xss(req.body.password);
    if (!username || !password)
      return res.status(401).json({
        status: false,
        message: "Thiếu dữ liệu đầu vào ",
      });
    if (username.length < 6 || username.length > 32)
      return res.status(403).json({
        status: false,
        message: "Tài khoản từ 6 -> 32 kí tự",
      });
    if (password.length < 6)
      return res.status(403).json({
        status: false,
        message: "Mật khẩu có ít nhất 6 kí tự",
      });
    let User = await userModel.findOne({ username });
    if (!User)
      return res.status(403).json({
        status: false,
        message: "Tài khoản không tồn tại",
      });
    await bcrypt.compare(password, User.password, (err, veri) => {
      if (veri) {
        let token = jwt.sign(
          {
            _id: User._id,
            username: User.username,
          },
          process.env.security,
          { expiresIn: 30 * 24 * 60 * 60 }
        );
        delete User.password;
        return res.status(200).json({
          status: true,
          message: "Đăng nhập thành công",
          token,
          data: {
            _id: User._id,
            email: User.email,
            username: User.username,
            role: User.role,
            security: User.security,
            createdAt: User.createdAt,
          },
        });
      }
      res.status(403).json({
        status: false,
        message: "Sai mật khẩu, hãy thử lại",
      });
    });
  }

  async register(req, res, next) {
    const email = xss(req.body.email);
    const username = xss(req.body.username);
    const password = xss(req.body.password);
    if (!helper.validateEmail(email) || !username || !password)
      return res.status(403).json({
        status: false,
        message: "Thiếu dữ liệu đầu vào hoặc không hợp lệ",
      });
    if (username.length < 6 || username.length > 32)
      return res.status(403).json({
        status: false,
        message: "Tài khoản từ 6 -> 32 kí tự",
      });
    if (password.length < 6)
      return res.status(403).json({
        status: false,
        message: "Mật khẩu có ít nhất 6 kí tự",
      });
    let User = await userModel.findOne({ $or: [{ username }, { email }] });
    if (User)
      return res.status(403).json({
        status: false,
        message: "Email hoặc tài khoản đã tồn tại",
      });
    let passwordEn = bcrypt.hashSync(password, 10);
    let security = helper.randomString();
    await userModel.create({
      email,
      username,
      password: passwordEn,
      role: 0,
      security
    });
    res.status(200).json({
      status: true,
      message: "Đăng kí thành công!",
    });
  }
}
module.exports = new authController();
