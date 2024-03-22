const mongo = require('mongoose');

const userSchema = new mongo.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    plan: { type: String, default: 'free', required: true },
    id: { type: Number, required: true, unique: true, },
});

module.exports = mongo.model('User', userSchema);




