const isAuthenticated = (req, res, next) => {
    if (process.env.NODE_ENV === "production") {
        if (req.session.user === undefined){
            return res.status(401).json("You do not have access.");
        } 
    }
    next();
}

module.exports = {
    isAuthenticated
}