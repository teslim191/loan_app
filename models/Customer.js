const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    loanBalanceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'LoanBalance'
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Customer", CustomerSchema);
