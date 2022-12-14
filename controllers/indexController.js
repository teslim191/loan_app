const Customer = require("../models/Customer");
const Loan = require("../models/Loan");

module.exports = {
  // get current user
  getCurrentUser: async (req, res, next) => {
    try {
      let customer = await Customer.findById(req.session.customer._id);
      let loan = await Loan.findOne({ customer: req.session.customer });
      if (!customer) {
        // res.redirect("/login");
        res.status(400).json({ error: "customer does not exist" });
      } else {
        // console.log(user.name, user.email)
        res.status(200).json({
          name: customer.name,
          email: customer.email,
          loan_balance: `₦${loan.balance}`,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  getAllUsers: async (req, res) => {
    try {
      let users = await Customer.find();
      if (!users) {
        res.status(404).json({ error: "no user found" });
      } else {
        res.status(200).jso(users);
      }
    } catch (error) {
      console.log(error);
    }
  },
  getUser: async (req, res) => {
    try {
      let user = await Customer.findById({ _id: req.params.id });
      if (!user) {
        res.status(404).json({ error: "user does not exist" });
      } else {
        res.status(200).json(user);
      }
    } catch (error) {
      console.log(error);
    }
  },
  loanApply: async (req, res) => {
    const { amount_borrowed, amount_paid } = req.body;

    if (!amount_borrowed || !amount_paid) {
      res.status(400).json({ error: "all fields are required" });
    } else {
      let loan = await Loan.findOne({ amount_borrowed });
      if (loan) {
        res.status(400).json({ error: "you have applied to a loan already" });
      } else {
        let status;
        let balance = amount_borrowed - amount_paid;
        if (balance == 0) {
          status = "cleared";
          Loan.deleteMany({});
        } else if (balance > 0) {
          status = "owed";
        } else {
          res.status(400).json({ error: "you cannot have negative balance" });
        }

        let loanApp = await Loan.create({
          amount_borrowed,
          amount_paid,
          balance,
          status,
          customer: req.session.customer,
        });
        loanApp.save();
        res.status(201).json({
          _id: loanApp._id,
          amount_borrowed: `₦${loanApp.amount_borrowed}`,
          amount_paid: `₦${loanApp.amount_paid}`,
          balance: `₦${loanApp.balance}`,
          status: loanApp.status,
          customer: req.session.customer.name,
        });
      }
    }
  },
  logoutUser: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      }
      res.json("youve logged out");
    });
  },
};
