const { check, validationResult } = require("express-validator");
exports.SignUpValidation = [
  check('name').notEmpty().withMessage("Name is requried"),
  check('email').isEmail().withMessage("valide email is requried"),
  check('password').isLength({ min: 6 }).withMessage("password should at least 6 charactors"),
  check('file').notEmpty().withMessage("profile is required")
]
exports.SingnInValidation = [
  check('email').isEmail().withMessage("valide email is requried"),
  check('password').isLength({ min: 6 }).withMessage("password should at least 6 charactors")
]
exports.isValidate = (req, res, next) => {
  const errors = validationResult(req);//it return array with the withmessage in that from check
  if (errors.array().length > 0) {
    return res.send({ status: 400, error: errors.array()[0].msg });
  }
  next();
}