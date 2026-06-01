const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const router = express.Router();

// ─── Razorpay Instance ────────────────────────────────────────────────────────

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ─── POST /payment/create-order ───────────────────────────────────────────────

router.post("/create-order", async (req, res) => {
  const {
    amount,
    currency = "INR",
    category,
    paperId,
    email,
    name,
  } = req.body;

  if (!amount || !category || !email || !name) {
    return res
      .status(400)
      .json({ error: "amount, category, email, and name are required" });
  }

  const parsedAmount = parseFloat(amount);

  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    return res.status(400).json({ error: "Invalid amount" });
  }

  try {
    const order = await razorpay.orders.create({
      amount: Math.round(parsedAmount * 100),
      currency,
      receipt: `wcise_${Date.now()}`,
      notes: {
        category,
        paperId: paperId || "",
        email,
        name,
      },
    });

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err) {
    console.error("Razorpay create-order error:", err);
    res.status(500).json({ error: "Failed to create order" });
  }
});

// ─── POST /payment/verify ─────────────────────────────────────────────────────

router.post("/verify", async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    name,
    email,
    category,
    paperId,
  } = req.body;

  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature
  ) {
    return res.status(400).json({ error: "Missing payment fields" });
  }

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    console.warn(
      "Razorpay signature mismatch for order:",
      razorpay_order_id
    );
    return res.status(400).json({ error: "Invalid payment signature" });
  }

  try {
    const payment = await razorpay.payments.fetch(
      razorpay_payment_id
    );

    // TODO: Save payment details to MongoDB
    // Example:
    // await Payment.create({
    //   paymentId: razorpay_payment_id,
    //   orderId: razorpay_order_id,
    //   name,
    //   email,
    //   category,
    //   paperId,
    //   amount: payment.amount,
    //   status: payment.status,
    // });

    res.json({
      success: true,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      amount: payment.amount,
      status: payment.status,
    });
  } catch (err) {
    console.error("Payment verify error:", err);
    res.status(500).json({ error: "Verification failed" });
  }
});

// ─── POST /payment/webhook ────────────────────────────────────────────────────

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
    const receivedSig = req.headers["x-razorpay-signature"];
    const rawBody = req.body;

    if (!receivedSig) {
      return res
        .status(400)
        .json({ error: "Missing signature header" });
    }

    const expectedSig = crypto
      .createHmac("sha256", process.env.WEBHOOK_SECRET)
      .update(rawBody)
      .digest("hex");

    if (expectedSig !== receivedSig) {
      console.warn("Webhook signature mismatch");
      return res
        .status(400)
        .json({ error: "Invalid signature" });
    }

    let event;

    try {
      event = JSON.parse(rawBody.toString());
    } catch {
      return res
        .status(400)
        .json({ error: "Invalid JSON payload" });
    }

    console.log("Razorpay webhook event:", event.event);

    switch (event.event) {
      case "payment.captured": {
        const p = event.payload.payment.entity;
        console.log(
          `Payment captured: ${p.id} — ₹${p.amount / 100}`
        );
        break;
      }

      case "payment.failed": {
        const p = event.payload.payment.entity;
        console.warn(
          `Payment failed: ${p.id} — ${p.error_description}`
        );
        break;
      }

      case "refund.created": {
        const r = event.payload.refund.entity;
        console.log(
          `Refund created: ${r.id} for payment ${r.payment_id}`
        );
        break;
      }

      default:
        console.log("Unhandled webhook event:", event.event);
    }

    res.json({ received: true });
  }
);

// ─── POST /payment/refund ─────────────────────────────────────────────────────

router.post("/refund", async (req, res) => {
  const { paymentId, amount } = req.body;

  if (!paymentId) {
    return res
      .status(400)
      .json({ error: "paymentId is required" });
  }

  try {
    const payload = { speed: "normal" };

    if (amount) {
      payload.amount = Math.round(parseFloat(amount) * 100);
    }

    const refund = await razorpay.payments.refund(
      paymentId,
      payload
    );

    res.json({
      success: true,
      refundId: refund.id,
      amount: refund.amount,
      status: refund.status,
    });
  } catch (err) {
    console.error("Refund error:", err);
    res.status(500).json({ error: "Refund failed" });
  }
});

module.exports = router;