import express from "express";
import Userfront from "../libs/userfront";

const router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  const tenant = await Userfront.getTenant();
  console.log(tenant);

  res.json({ message: "Check your console log" });
});

export { router as indexRouter };
