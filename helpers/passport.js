const GitHubStrategy = require("passport-github2").Strategy;

const init = (passport) => {
    passport.use(new GitHubStrategy({
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL
        },
        (accessToken, refreshToken, profile, done) => {
            // find or create a user in MongoDb User.findOrCreate({ githubId: profile.id }, function (err, user) {
            //console.log(profile)
            return done(null, profile);
        }
    ));

    passport.serializeUser((user, done) => {
        done(null, user);
    });
    
    passport.deserializeUser((user, done) => {
        done(null, user);
    });
}

module.exports = {
    init,
}