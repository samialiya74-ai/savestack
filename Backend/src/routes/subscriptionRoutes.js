const express = require("express");

const router = express.Router();

let subscriptions = [
  {
    id: 1,
    name: "Netflix",
    price: 15,
    billingCycle: "Monthly",
    nextPaymentDate: "2026-05-20",
  },
  {
    id: 2,
    name: "Spotify",
    price: 10,
    billingCycle: "Monthly",
    nextPaymentDate: "2026-05-25",
  },
];

// GET all subscriptions
router.get("/", (req, res) => {
  res.json(subscriptions);
});

// POST new subscription
router.post("/", (req, res) => {
  const newSubscription = {
    id: Date.now(),
    ...req.body,
  };

  subscriptions.push(newSubscription);

  res.status(201).json(newSubscription);
});

// DELETE subscription
router.delete("/:id", (req, res) => {
  subscriptions = subscriptions.filter(
    (sub) => sub.id !== parseInt(req.params.id)
  );

  res.json({ message: "Subscription deleted" });
});

module.exports = router;