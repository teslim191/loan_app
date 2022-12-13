module.exports = {
  ensureAuth: (req, res, next) => {
    if (req.session.customer) {
      return next();
    } else {
      res
        .status(401)
        .json({
          error: "you are not authorised to view this resource, please login",
        });
    }
  },
  ensureGuest: (req, res, next) => {
    if (req.session.customer) {
      res.status(200).json({message: 'you are welcome'});
    } else {
      return next();
    }
  },
};
