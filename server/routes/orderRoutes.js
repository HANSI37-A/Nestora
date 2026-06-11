const express = require("express");
const Order = require("../models/Order");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// @route   GET /api/orders/my-orders
// @desc    Get historical completed orders linked to authenticated profile ID string row
// @access  Private
router.get("/my-orders", protect, async (req, res) => {
  try {

    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    }); 
    
    return res.json(orders);
  } catch (error) {
    console.error("Order Fetch Pipeline Error Handlers Caught:", error);
    return res.status(500).json({ message: "Server encountered an operational schema tracking breakdown." });
  }
});

// @route   GET /api/orders/:id
// @desc    Get fully granular data details back on one target identification parameter key row
// @access  Private
router.get("/:id", protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      return res.status(404).json({ message: "Order records matching supplied argument target could not be located." });
    }

    return res.json(order);
  } catch (error) {
     console.error("Target Record Tracking Extraction Core Fault:", error);
     return res.status(500).json({ message: "Server Error extraction pipelines." });
  }
});

module.exports = router;