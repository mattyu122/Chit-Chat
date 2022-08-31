const mongoose = require('mongoose');

//verifying account database model
var VerifyingAccountSchema = mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId},
    email: {type: String, unique: true, require: true},
    password: {type: String, require: true},
    expire_at: {type: Date, default: Date.now, expires: 86400}  //auto delete after 1 day
});

var VerifyingAccount = mongoose.model('VerifyingAccount',VerifyingAccountSchema);

module.exports = VerifyingAccount;