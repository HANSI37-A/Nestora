const express = require("express");
const Checkout = require("../models/Checkout");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Order = require("../models/Order");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// @route POST /checkout/:checkoutId/create-stripe-session
// @desc Create a hosted Stripe Checkout Session
// @access Private
router.post("/:checkoutId/create-stripe-session", protect, async (req, res) => {
  try {
    const { checkoutId } = req.params;

    const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

    if (!process.env.STRIPE_SECRET_KEY) {
      console.error("CRITICAL ERROR: STRIPE_SECRET_KEY is missing from your environmental .env configurations!");
      return res.status(500).json({ message: "Payment gateway misconfigured on server configurations." });
    }

    const checkout = await Checkout.findById(checkoutId);
    if (!checkout) {
      return res.status(404).json({ message: "Checkout record not found." });
    }

    const lineItems = checkout.checkoutItems.map((item) => {
      const validImages = [];
      
      if (item.image && typeof item.image === "string" && item.image.trim() !== "") {

        if (item.image.startsWith("http://") || item.image.startsWith("https://")) {
          validImages.push(item.image);
        } else {

          const backendBaseUrl = process.env.BACKEND_URL || "http://localhost:5000";
          const cleanlyFormattedPath = item.image.startsWith("/") ? item.image : `/${item.image}`;
          validImages.push(`${backendBaseUrl}${cleanlyFormattedPath}`);
        }
      }

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name || "Nestora Premium Selection",
            images: validImages, 
            description: `Size: ${item.size || "Standard"} | Color: ${item.color || "Default"}`,
          },
          unit_amount: Math.round((item.price || 0) * 100), 
        },
        quantity: item.quantity || 1,
      };
    });

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      client_reference_id: checkoutId.toString(),
      success_url: `${frontendUrl}/profile?session_id={CHECKOUT_SESSION_ID}&checkout_id=${checkoutId}`,
      cancel_url: `${frontendUrl}/checkout`,
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Stripe Session Mapping Pipeline Crash:", error.message);
    return res.status(500).json({ 
      message: "Internal server error processing Stripe payment routing details.",
      error: error.message 
    });
  }
});

// @route GET /checkout/:id
// @desc Fetch single checkout document data footprint matching context
// @access Private
router.get("/:id", protect, async (req, res) => {
  try {
    const checkout = await Checkout.findById(req.params.id);
    if (!checkout) {
      return res.status(404).json({ message: "Checkout database profile record not found." });
    }
    return res.status(200).json(checkout);
  } catch (error) {
    console.error("Single order context pull breakdown:", error);
    return res.status(500).json({ message: "Internal server registry verification failure." });
  }
});

// @route POST /checkout
// @desc Create a new checkout session record
// @access Private
router.post("/", protect, async (req, res) => {
  const { checkoutItems, shippingAddress, totalPrice } = req.body;
  
  if (!checkoutItems || checkoutItems.length === 0) {
    return res.status(400).json({ message: "No items in checkout" });
  }
  try {
    const newCheckout = await Checkout.create({
      user: req.user._id,
      checkoutItems: checkoutItems,
      shippingAddress,
      paymentMethod: "Stripe", 
      totalPrice,
      paymentStatus: "Pending",
      isPaid: false,
    });
    console.log(`Checkout created for user: ${req.user._id}`);
    return res.status(201).json(newCheckout);
  } catch (error) {
    console.error("Error Creating checkout session:", error);
    return res.status(500).json({ message: "Server Error" });
  }
});

// @route   PUT /checkout/:id/pay
// @desc    Update checkout status details and instantly finalize into Order History + clear DB Cart
// @access  Private
router.put("/:id/pay", protect, async (req, res) => {
  const { sessionId } = req.body; 
  try {
    const checkout = await Checkout.findById(req.params.id);
    if (!checkout) {
      return res.status(404).json({ message: "Checkout not found" });
    }

    checkout.isPaid = true;
    checkout.paymentStatus = "Paid";
    checkout.paidAt = Date.now();
    checkout.paymentDetails = { id: sessionId, status: "succeeded" };
    await checkout.save();

    if (!checkout.isFinalized) {
      await Order.create({
        user: checkout.user,
        orderItems: checkout.checkoutItems,
        shippingAddress: checkout.shippingAddress,
        paymentMethod: checkout.paymentMethod,
        totalPrice: checkout.totalPrice,
        isPaid: true,
        paidAt: checkout.paidAt,
        isDelivered: false,
        paymentStatus: "Paid",
        paymentDetails: checkout.paymentDetails,
      });

      checkout.isFinalized = true;
      checkout.finalizedAt = Date.now();
      await checkout.save();

      await Cart.findOneAndDelete({ user: checkout.user });
      console.log(`Cart wiped and order document created for user: ${checkout.user}`);
    }

   return res.status(200).json({ 
      success: true, 
      message: "Order successfully saved to history logs.",
      checkout 
    });
  } catch (error) {
    console.error("Error updating checkout and auto-finalizing history records:", error);
    return res.status(500).json({ message: "Server Error during transaction clearance." });
  }
});

module.exports = router;