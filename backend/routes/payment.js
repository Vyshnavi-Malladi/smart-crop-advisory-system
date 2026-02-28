const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require('crypto');

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ===============================
// CREATE ORDER
// ===============================
router.post('/create-order', async (req, res) => {
    try {

        const { amount } = req.body;

        const options = {
            amount: amount * 100, // convert to paise
            currency: "INR",
            receipt: "receipt_" + Date.now()
        };

        const order = await razorpay.orders.create(options);
        res.json(order);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// ===============================
// VERIFY PAYMENT
// ===============================
router.post('/verify-payment', (req, res) => {

    try {

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        if (expectedSignature === razorpay_signature) {
            res.json({ success: true });
        } else {
            res.status(400).json({ success: false });
        }

    } catch (err) {
        res.status(500).json({ error: err.message });
    }

});

module.exports = router;