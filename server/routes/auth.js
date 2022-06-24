// importing to user scheme
const router = require("express").Router();
const User = require("../models/User");

// importing password encryption module
const bcrypt = require("bcryptjs");

// REGISTER, HTTP method: post
// adding a new user to the system
router.post("/register", async (req, res) => {
  try {
    // generate salt for increased security
    const salt = await bcrypt.genSalt(10);
    // hashing the password with the salt
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    // creating a new user by the user scheme from MongoDB
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
      first_name:req.body.first_name,
      last_name:req.body.last_name,
      marital_status:req.body.marital_status,
      birthday:req.body.birthday
    });
    // saving the new user to DB
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN HTTP method: post
router.post("/login", async (req, res) => {
  try {
    // finding the username inside the DB and returning the scheme
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json("Wrong credentials!");

    // validating the password for a match
    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(400).json("Wrong credentials!");

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

// exporting to allow importing in another place
module.exports = router;