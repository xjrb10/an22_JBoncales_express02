const User = require('../models/user');
const bcrypt = require('bcrypt');
const auth = require('../auth')

module.exports.registerUser = async (reqBody) => {
    const user = await (new User({
        firstName: reqBody.firstName,
        lastName: reqBody.lastName,
        email: reqBody.email,
        mobileNo: reqBody.mobileNo,
        password: bcrypt.hashSync(reqBody.password, 10)
    })).save();
    user.password = "";
    return user;
};

module.exports.loginUser = async (reqBody) => {
    const result = await (User.findOne({email: reqBody.email}));

    if (result == null) return false;

    return bcrypt.compareSync(reqBody.password, result.password) ? {
        access: auth.createAccessToken(result)
    } : false;
};

module.exports.getProfile = async (data) => {
    const result = await User.findById(data.userId);
    result.password = "";

    return result;
};