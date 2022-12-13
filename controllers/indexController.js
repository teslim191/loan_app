const Customer = require("../models/Customer");
const Loan = require("../models/Loan");

module.exports = {
  // get current user
  getCurrentUser: async (req, res, next) => {
    try {
      let customer = await Customer.findById(req.session.customer._id);
      if (!customer) {
        // res.redirect("/login");
        res.status(400).json({ error: "customer does not exist" });
      } else {
        // console.log(user.name, user.email)
        res.status(200).json({
          name: customer.name,
          email: customer.email,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
  loanApp: async (req, res) => {
    const { amount_borrowed } = req.body;
    try {
      let loan = await Loan.findOne({ amount_borrowed })
      if (loan) {
        res.status(400).json({ error: "customer already applied for loan" });
      } else {
        loan = await Loan.create({
          amount_borrowed,
          customerId: req.session.customer,
        });
        if (loan.amount_borrowed ==0 || loan.amount_borrowed < 0) {
          loan.amount_borrowed = 0
        }
        loan.save()
        res.status(201).json({
          amount_borrowed: loan.amount_borrowed,
          customer: req.session.customer.name,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
};
