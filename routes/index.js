const routes = require('express').Router();

routes.use('/', require('./swagger'));

routes.use('/', require('./auth'));

routes.use('/departments', require('./departments'));
routes.use('/employees', require('./employees'));
routes.use('/facilities', require('./facilities'));
routes.use('/locations', require('./locations'));
routes.use('/managers', require('./managers'));

module.exports = routes;