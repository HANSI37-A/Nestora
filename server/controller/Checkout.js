const Checkout = require("../models/Checkout"); 
const Order = require("../models/Order");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// @desc    Create Stripe Checkout Session dynamically using Checkout Document details
// @route   POST /checkout/:checkoutId/create-stripe-session
const createStripeSession = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized, user data missing from handshake header." });
    }
    const { checkoutId } = req.params;

    const checkout = await Checkout.findById(checkoutId);
    
    if (!checkout) {
      return res.status(404).json({ message: "Checkout record not found." });
    }

    checkout.isPaid = true;
    checkout.paidAt = Date.now();
    checkout.paymentResult = {
      id: `SIMULATED_TX_${Date.now()}`,
      status: "COMPLETED",
      update_time: new Date().toISOString(),
      email_address: req.user.email,
    };
    await checkout.save();

    const newOrder = await Order.create({
      user: req.user._id,
      orderItems: checkout.checkoutItems.map(item => ({
        product: item.productId,
        name: item.name,
        quantity: item.quantity,
        image: item.image,
        price: item.price,
        color: item.color,
        size: item.size
      })),
      shippingAddress: checkout.shippingAddress,
      paymentMethod: checkout.paymentMethod,
      totalPrice: checkout.totalPrice,
      isPaid: true,
      paidAt: Date.now(),
      paymentResult: checkout.paymentResult,
    });

    const simulatedSuccessUrl = `${process.env.FRONTEND_URL}/order-confirmation?checkout_id=${checkoutId}`;

    res.status(200).json({ url: simulatedSuccessUrl });
  } catch (error) {
    console.error("Payment Bypass Simulation Pipeline Crash:", error);
    res.status(500).json({ message: "Internal server error processing payment simulation." });
  }
};
   
module.exports = { createStripeSession };