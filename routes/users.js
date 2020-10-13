const express = require("express");
const DBconnection = require("../DBconnection/connection");
const router = express.Router();

DBconnection;

//VALIDATION MIDDLEWARE
const { UserValidator } = require("../middlewares/userValidator");

//User model
const User = require("../models/User");

//Response helper functions
const {
  SuccessResponse,
  FailedResponse,
} = require("../helpers/user-api-response-helper");

//GET ALL DETAILS OF USERS
router.get("/", async (req, res) => {
  await User.aggregate([
    {
      $lookup: {
        from: "paymentdata",
        localField: "name",
        foreignField: "username",
        as: "received_payments",
      },
    },
    {
      $project: {
        __v: 0,
        "received_payments._id": 0,
        "received_payments.username": 0,
      },
    },
  ]).exec((err, data) => {
    if (err) {
      FailedResponse(res, 400, err);
    } else {
      SuccessResponse(res, 200, data);
    }
  });
});

//ADD NEW USER
router.post("/adduser", UserValidator, async (req, res) => {
  const { name, age, email } = req.body;
  const user = new User({
    name,
    email,
    age,
  });
  try {
    const savedUser = await user.save();
    SuccessResponse(res, 200, savedUser);
  } catch (error) {
    FailedResponse(res, 400, error);
  }
});

//EDIT A USER
router.patch("/updateuser/:id", UserValidator, async (req, res) => {
  const { name, age, email } = req.body;
  const updatedUser = await User.updateOne(
    { _id: req.params.id },
    {
      $set: {
        name,
        email,
        age,
      },
    }
  );
  SuccessResponse(res, 200, updatedUser);
});

//DELETE A USER
router.delete("/deleteuser/:id", async (req, res) => {
  try {
    const removedUser = await User.deleteOne({ _id: req.params.id });
    SuccessResponse(res, 200, removedUser);
  } catch (error) {
    FailedResponse(res, 400, error);
  }
});

module.exports = router;
