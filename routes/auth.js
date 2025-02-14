const router = require("express").Router();
const passport = require("passport");

const mode = process.env.NODE_ENV || "production";

if (mode === "production") {
    // @desc checks if you are logged in
    // @route GET /
    router.get("/", (req, res) => { 
        if (req.session.user !== undefined) {
            res.send(`Logged in as ${req.session.user.displayName}`)
            // console.log(req.session.user)
        } else { 
            res.send("Logged Out") 
        }
    });

    // @desc Github callback
    // @route GET /github/callback
    /**
    * @swagger-ignore
    */
    router.get("/github/callback", 
        passport.authenticate("github", 
            {
                failureRedirect: "/api-docs", session: false
            }),
            (req, res) => {
                req.session.user = req.user;
                res.redirect("/")
            }
    )
    /**
    * @swagger-ignore
    */
    router.get("/login", passport.authenticate("github", (req, res) => {}));
    /**
    * @swagger-ignore
    */
    router.get("/logout", (req, res, next) => {
        req.logOut((err) => {
            if (err) {
                return next(err)
            }
            res.redirect("/");
        })
    })
} else {
    router.get('/', (req, res) => { 
        //#swagger.tags=['Whats up group 10!']
        res.send('Whats up group 10!');
    });
}

module.exports = router;