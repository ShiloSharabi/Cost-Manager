// importing to user and cost schemes
const router = require("express").Router();
const User = require("../models/User");
const Cost = require("../models/Cost");

// CREATE COST, HTTP method: post
// adding a new cost for a specific user
router.post("/add-cost", async (req, res) => {
  // creating a new cost by mongo scheme
  const newCost = new Cost(req.body);
  try {
    // saving the cost to DB
    const savedCost = await newCost.save();
    res.status(200).json(savedCost);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE COST, HTTP method: put
// updating cost details
router.put("/:id", async (req, res) => {
  try {
    // finding the required cost to update from DB
    const cost = await Cost.findById(req.params.id);
    if (cost.username === req.body.username) {
      try {
        // updating the cost details
        const updatedCost = await Cost.findByIdAndUpdate(
          req.params.id, {
            $set: req.body,
          }, {
            new: true
          }
        );
        res.status(200).json(updatedCost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your cost!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE COST, HTTP method: delete
// deleting a specific cost by cost id
router.delete("/:id", async (req, res) => {
  try {
    // finding the cost from mongoDB by id
    const cost = await Cost.findById(req.params.id);
    if (cost.username === req.body.username) {
      try {
        // deleting the cost
        await cost.delete();
        res.status(200).json("cost has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can delete only your COST!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET COST, HTTP method: get
// getting specific cost details by id
router.get("/get-cost/:id", async (req, res) => {
  try {
    // finding the cost
    const cost = await Cost.findById(req.params.id);
    res.status(200).json(cost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL COSTS, HTTP method: get
// getting all cost by user with an option to filter by category, year or month
router.get("/", async (req, res) => {
  const username = req.query.user;
  const category = req.query.category;
  const year = req.query.year;
  const month = req.query.month;
  try {
    let costsObj;
    let costs = []
    costsObj = await Cost.find({
      username
    })
    for (let index = 0; index < costsObj.length; index++) {
      costs.push(costsObj[index])
    }
    // filtering by category if not null
    if (category) {
      costs = costs.filter((cost) => cost._doc.category === category)
    }
        // filtering by year if not null
    if (year) {
      costs = costs.filter((cost) => cost._doc.createdAt.toString().split(' ')[3] === year)
    }
        // filtering by month if not null
    if (month) {
      costs = costs.filter((cost) => cost._doc.createdAt.toString().split(' ')[1] === month)
    }
    let sum = 0
    costs.forEach(element => {

      // computed design pattern implementation
      sum += (+element._doc.sum)
    });
        res.status(200).json({
        "costs": costs,
        "sum": sum
      }

    );

  } catch (err) {
    res.status(500).json(err);
  }
});

// exporting to allow importing in another place
module.exports = router;