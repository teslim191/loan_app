const Customer = require("../models/Customer");
const bcrypt = require('bcrypt')

module.exports = {
  signUp: async (req, res, next) => {
    const { name, email, password,gender } = req.body;
  
    try {
        // require all fields
      if (!name || !email || !password || !gender) {
        res.status(400).json({ message: "all fields are required" });
      } else if (password.length < 6 || password.length > 12) {
        res.status(400).json({ message: "password too short or too long" });
      } else {
        // check if user exists
        let customer = await Customer.findOne({ email });
        if (customer) {
          res.status(400).json({ message: "customer already exists" });
        } else {
            // hash password
          const salt = await bcrypt.genSalt(10);
          const hashedpassword = await bcrypt.hash(password, salt);
        //   create a new customer
          customer = await Customer.create({
            name,
            email,
            password: hashedpassword,
            gender
          });
          res.status(201).json({
            _id: customer.id,
            name: customer.name,
            email: customer.email,
            gender: customer.gender
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
//   signin user
  signIn: async(req, res, next) => {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        res.status(400).json({ error: "Please fill in all fields" });
      } else {
        let customer = await Customer.findOne({ email });
        if (!customer) {
          res.status(400).json({ error: "customer does not exist" });
        } else {
          const isMatch = await bcrypt.compare(password, customer.password);
          if (!isMatch) {
            res.status(400).json({ error: "incorrect password" });
          } else {
            req.session.customer = customer;
            // res.redirect("/");
            res.json({welcome: `logged in as ${customer.name}`})
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
};
