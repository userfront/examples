var express = require("express");
var router = express.Router();
var Userfront = require("../libs/userfront");

/* GET home page. */
router.get("/", async function (req, res, next) {
  const tenant = await Userfront.getTenant();
  console.log(tenant);

  res.json({ message: "Check your console log" });
});

module.exports = router;
