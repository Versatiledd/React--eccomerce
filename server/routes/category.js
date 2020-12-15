const express = require("express");

const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/auth");
const {
  create,
  read,
  update,
  remove,
  list,
  getSubs,
} = require("../controllers/category");

// routes

router.post(`${process.env.API_URL}/category`, authCheck, adminCheck, create);
router.get(`${process.env.API_URL}/categories`, list);
router.get(`${process.env.API_URL}/category/:slug`, read);
router.put(
  `${process.env.API_URL}/category/:slug`,
  authCheck,
  adminCheck,
  update
);
router.delete(
  `${process.env.API_URL}/category/:slug`,
  authCheck,
  adminCheck,
  remove
);
router.get(`${process.env.API_URL}/category/subs/:_id`, getSubs);

module.exports = router;
