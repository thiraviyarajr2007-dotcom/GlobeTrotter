const mongoose = require("mongoose");

const TripSchema = new mongoose.Schema({
  userId: String,
  city: String,
  dates: String,
  activities: [String],
  budget: Number
});

module.exports = mongoose.model("Trip", TripSchema);
