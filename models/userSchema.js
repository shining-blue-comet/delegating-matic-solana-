const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  wallets: [
    {
      networkId: Number,
      networkName: String,
      address: String
    },
  ]
});

module.exports = mongoose.model('users', userSchema);