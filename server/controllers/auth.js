const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { config } = require("dotenv");

// @route POST  localhost:8080/api/register
// @desc route register
// @access Public
exports.createRegister = async (req, res) => {
  const { username, password } = req.body;
  try {
    //Check user
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: "Username already exists" });
    }
    user = new User({
      username,
      password,
    });

    // Encryt password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    //payload return jsonwebtoken
    const payload = {
      user: {
        name: user.username,
        role: user.role,
      },
    };
    jwt.sign(payload, "jwtSecret", { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });

    // res.send("User Register Complete");
  } catch (err) {
    // check error
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

// @route POST  localhost:8080/api/login
// @desc route login
// @access Public
exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    //Check user
    let user = await User.findOneAndUpdate({ username }, { new: true });
    if (!user) {
      return res.status(400).json({ msg: "Username Invalid Credentials" });
    }

    // Compare Encryt password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Password Invalid Credentials" });
    }

    //payload return jsonwebtoken
    const payload = {
      user: {
        id: user._id,
        name: user.username,
        role: user.role,
      },
    };
    jwt.sign(payload, "jwtSecret", { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ token, payload });
    });

    // res.send("User Register Complete");
  } catch (err) {
    // check error
    console.log(err.message);
    res.status(500).send("Server Error");
  }
};

// @route POST  localhost:8080/api/current-user
// @desc route current-user
// @access Private
exports.currentUser = async (req, res) => {
  User.findOne({ username: req.user.name })
    .select("-password")
    .exec((err, user) => {
      if (err) throw new Error(err);
      res.json(user);
    });
};
