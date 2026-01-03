const router = require("express").Router();
const Trip = require("../models/Trip");

router.post("/save", async (req, res) => {
  const trip = new Trip(req.body);
  await trip.save();
  res.json({ message: "Trip saved" });
});

router.get("/:userId", async (req, res) => {
  const trips = await Trip.find({ userId: req.params.userId });
  res.json(trips);
});

module.exports = router;
