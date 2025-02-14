const routes = require('express').Router();
// const passport = require('passport');

routes.use('/', require('./swagger'));

routes.use('/', require('./auth'));

routes.use('/departments', require('./departments'));
routes.use('/employees', require('./employees'));
routes.use('/facilities', require('./facilities'));
routes.use('/locations', require('./locations'));
routes.use('/managers', require('./managers'));


// Commented out for OAuth
// routes.get('/login', passport.authenticate('github'), (req, res) => {});

// routes.get('/logout', function(req, res, next) {
//     req.logout(function(err) {
//         if (err) { return next(err); }
//         res.redirect('/');
//     })
// });

module.exports = routes;