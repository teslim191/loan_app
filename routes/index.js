const express = require("express");
const router = express.Router();
const { signUp, signIn } = require("../controllers/authController");

/*
@post request to create a customer
signup
*/
router.post("/signup", signUp);
/*
@post request to signin a customer
signin
*/
router.post('/signin', signIn)



module.exports = router;
