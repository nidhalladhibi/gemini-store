import Stripe from "stripe";

export async function createPaymentIntent(req, res, next) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) return res.status(501).json({ message: "Stripe is not configured" });
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const intent = await stripe.paymentIntents.create({
      amount: Math.round(Number(req.body.amount) * 100),
      currency: "usd",
      metadata: { integration: "gemini-store" }
    });
    res.json({ clientSecret: intent.client_secret });
  } catch (error) {
    next(error);
  }
}
