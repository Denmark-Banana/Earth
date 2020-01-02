const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
    name : String,
    email: String,
    password : String
});

// hash 생성
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// 값 비교
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password)
};

const model = mongoose.model('User', userSchema);
module.exports = model;
