const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/userSchema');

// user login funtion
exports.login = (req, res) => {
  if (!isValidateEmail(req.body.email)) {
    return res.status(401).json({suc: false, msg: "Invalid Email."});
  }
  if (!isStrongPassword(req.body.password)) {
    return res.status(401).json({suc: false, msg: "Weak Password"});
  }
  let getUser;
  User.findOne({
    email: req.body.email
  }).then(user => {
    if (!user) {
      return res.status(401).json({suc: false, msg: "Non Existent Email."});
    }
    getUser = user;
    return bcrypt.compare(req.body.password, user.password);
  }).then(response => {
    if (!response) {
      return res.status(401).json({suc: false, msg: "Wrong Password."});
    }
    let jwttoken = jwt.sign({
      email: getUser.email,
      userId: getUser._id
    }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    return res.status(200).json({
      token: jwttoken,
      expiresIn: 3600,
      data: getUser
    });
  }).catch(err => {
    return res.status(500).json({suc: false, msg: "Server Error."});
  });
}

// user signup function
exports.singup = (req, res) => {
  if (!isValidateEmail(req.body.email)) {
    return res.status(401).json({suc: false, msg: "Invalid Email."});
  }
  if (!isStrongPassword(req.body.password)) {
    return res.status(401).json({suc: false, msg: "Weak Password"});
  }
  User.findOne({ email: req.body.email })
    .then(user => {
      if(user) {
        return res.status(200).json({suc: false, msg: "Email already exists."});
      } else {
        const newUser = new User({
          email: req.body.email,
          password: req.body.password
        });
        // Hash password
        const rounds = 10;
        bcrypt.genSalt(rounds, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(_ => {
                return res.status(200).json({ suc: true, msg: "User Successfully Created."});
              })
              .catch(err => {
                return res.status(500).json({error: err});
              })
          });
        });
      }
    }).catch(e => {
      return res.status(500).json({suc: false, msg: "Signup failed."});
    });
}

// user add wallet function
exports.addWallet = (req, res) => {
  User.findOne({
    email: req.body.email
  }).then(user => {
    if (!user) {
      return res.status(401).json({suc: false, msg: "Non Existent Email."});
    }
    user.wallets.push({
      networkId: req.body.networkId,
      networkName: req.body.networkName,
      address: req.body.address
    });
    user.save()
      .then(updatedUser => {
        return res.status(200).json({suc: true, data: updatedUser});
      });
  }).catch(err => {
    return res.status(500).json({suc: false, msg: "Server Error."});    
  });
}

const isValidateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const isStrongPassword = (password) => {
  let strongPasswordExp = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
  return strongPasswordExp.test(password);
}

exports.test = (req, res) => {
  return res.status(200).json({"result": "success"});
};
