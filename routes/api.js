const express = require("express");
const { getCurrentUser, loanApply, getAllUsers, getUser, logoutUser} = require("../controllers/indexController");
const { ensureAuth } = require("../middleware/auth");
const router = express.Router();

/*
@GET - get current logged in user
*/
router.get("/dashboard", ensureAuth, getCurrentUser);

/**
 * @POST --get balance
 */
router.post("/apply", ensureAuth, loanApply);

/**
 * @GET -- get all users
 */
router.get('/users', ensureAuth, getAllUsers)

/**
 * @GET -- get a single users
 */
router.get('/user/:id', ensureAuth, getUser)

/**
 * @GET -- logout a user
 */
router.get("/logout", logoutUser);


module.exports = router;
