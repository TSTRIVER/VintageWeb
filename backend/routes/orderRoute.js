const express = require("express");
const {
  newOrder,
  myOrders,
  getAllOrders,getSingleOrder
  /*,
  updateOrder,
  deleteOrder,*/
} = require("../controllers/orderController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/orders/me").get(isAuthenticatedUser, myOrders);
router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);
router.route("/order/:id").get(isAuthenticatedUser,getSingleOrder);

module.exports = router;