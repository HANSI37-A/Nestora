const Checkout = require("../models/Checkout"); 
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// @desc    Create Stripe Checkout Session dynamically using Checkout Document details
// @route   POST /api/checkout/:checkoutId/create-stripe-session
const createStripeSession = async (req, res) => {
  try {
    const { checkoutId } = req.params;

    const checkout = await Checkout.findById(checkoutId);
    
    if (!checkout) {
      return res.status(404).json({ message: "Checkout record not found." });
    }

    const lineItems = checkout.checkoutItems.map((item) => {
      return {
        price_data: {
          currency: "usd", 
          product_data: {
            name: item.name,
            images: item.image ? [item.image] : [],
            description: `Size: ${item.size || "N/A"} | Color: ${item.color || "N/A"}`,
          },
          unit_amount: Math.round(item.price * 100), 
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      client_reference_id: checkoutId,
      customer_email: req.user?.email, 
      success_url: `${process.env.FRONTEND_URL}/profile?session_id={CHECKOUT_SESSION_ID}&checkout_id=${checkoutId}`,
      cancel_url: `${process.env.FRONTEND_URL}/checkout`,
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Stripe Session Mapping Pipeline Crash:", error);
    res.status(500).json({ message: "Internal server error processing Stripe payment routing details." });
  }
};

module.exports = { createStripeSession };