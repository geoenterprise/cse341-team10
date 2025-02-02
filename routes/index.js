const routes = require('express').Router();
const passport = require('passport');

routes.use('/', require('./swagger'));

routes.get('/', (req, res) => { 
    //#swagger.tags=['Whats up people!']
    res.send('Whats up people!');
});

routes.use('/employees', require('./employees'));
routes.use('/facilities', require('./facilities'));

routes.get('/login', passport.authenticate('github'), (req, res) => {});

routes.get('/logout', function(req, res, next) {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    })
});

module.exports = routes;