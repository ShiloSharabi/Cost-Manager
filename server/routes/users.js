// importing to user and cost schemes
const router = require("express").Router();
const User = require("../models/User");
const Cost = require("../models/Cost");

// importing password encryption module
const bcrypt = require("bcryptjs");

// UPDATE, HTTP method: put
// updating user details
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(401).json("You can update only your account!");
  }
});

// DELETE, HTTP method: delete
// removing user from the system
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      // finding the user in the DB by users id
      const user = await User.findById(req.params.id);
      try {
        // deleting all costs related to user
        await Cost.deleteMany({ username: user.username });
        // finding and deleting the user
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json("User not found!");
    }
  } else {
    res.status(401).json("You can delete only your account!");
  }
});

// GET USER, HTTP method: get
// getting user profile
router.get("/:id", async (req, res) => {
  try {
    // finding the user by id
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

// exporting to allow importing in another place
module.exports = router;