const routes = require('express').Router();
// const passport = require('passport');

routes.use('/', require('./swagger'));

routes.get('/', (req, res) => { 
    //#swagger.tags=['Whats up group 10!']
    res.send('Whats up group 10!');
});

routes.use('/employees', require('./employees'));
routes.use('/facilities', require('./facilities'));

// Commented out for OAuth
// routes.get('/login', passport.authenticate('github'), (req, res) => {});

// routes.get('/logout', function(req, res, next) {
//     req.logout(function(err) {
//         if (err) { return next(err); }
//         res.redirect('/');
//     })
// });

module.exports = routes;