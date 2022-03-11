const { validationResult, check } = require("express-validator")

// check register data

exports.registerCheck = () => [
    check("firstName", "firstName is required").not().isEmpty(),
    check("email", "this field must be a valid mail").isEmail(),
    check("password", "password should contain at least 6 chars").isLength({ min: 6 })
]

//check login data
exports.loginCheck = () => [
    check("email", "this field must be a valid mail").isEmail(),
    check("password", "password should contain at least 6 chars").isLength({ min: 6 })
]

exports.validator = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() })
    }
    next()
}