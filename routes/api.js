const express = require("express");
const { getCurrentUser, loanApp } = require("../controllers/indexController");
const { ensureAuth } = require("../middleware/auth");
const Loan = require("../models/Loan");
const router = express.Router();

/*
@GET - get current logged in user
*/
router.get("/dashboard", ensureAuth, getCurrentUser);

/**
 * @POST --apply for loan
 */
router.post("/apply", loanApp);

/**
 * @POST --get balance
 */
router.post("/apply", ensureAuth, async (req, res) => {
  const { amount_borrowed,amount_paid,status } = req.body;

  if (!amount_borrowed || !amount_paid) {
    res.status(400).json({error: 'all fields are required'})
  }
  else{
    let balance = amount_borrowed - amount_paid
    if (balance == 0) {
      status = "cleared"
      Loan.deleteMany({})
    }
    else if(balance > 0){
      status = "owed"
    }
    else{
      res.status(400).json({error: 'you cannot have negative balance'})
    }
    let loan = await Loan.findOne({amount_borrowed})
    if(loan){
      res.status(400).json({error: `${req.session.customer} already applied for loan`})
    }
    else{
      let loanApp = await Loan.create({
        amount_borrowed,
        amount_paid,
        balance,
        status,
        customerId
      })
      loanApp.save()
  
      res.status(201).json({
        amount_borrowed: `₦${loanApp.amount_borrowed}`,
        amount_paid: `₦${loanApp.amount_paid}`,
        balance: `₦${loanApp.balance}`,
        status: loanApp.status,
        customer: req.session.customer.name
      })
    }




  }
});

module.exports = router;
