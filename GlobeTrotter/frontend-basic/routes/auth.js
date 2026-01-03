const router = require("express").Router();

router.post("/login", (req, res) => {
  const { email } = req.body;
  res.json({ userId: email, name: "Globe User" });
});

module.exports = router;
