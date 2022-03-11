const isAdmin = (req, res, next) => {
    console.log(req.user);
    if (req.user.role == "client") {
        return res.status(401).send({ msg: "not auth (admin)" })
    }
    next()
}

module.exports = isAdmin