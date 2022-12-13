const mongoose = require("mongoose");

const LoanSchema = new mongoose.Schema(
  {
    amount_borrowed: {
      type: Number,
      required: true,
    },
    amount_paid: {
      type: Number,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
      min: 0
    },
    status: {
      type: String,
      enum: ["cleared", "owed"],
      default: "owed",
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Loan", LoanSchema);
