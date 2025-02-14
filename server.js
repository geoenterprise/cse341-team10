const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3100;
const mode = process.env.NODE_ENV || "production";


app.use(bodyParser.json())

if (mode === "production") {
    // session middleware
    app.use(session({
        secret: "secret" ,
        resave: false ,
        saveUninitialized: true,
    }))
    // passport middleware
    .use(passport.initialize())
    .use(passport.session())
} 
// header
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Z-key");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next()})    
// cors
// if (mode === "production") {
    app.use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']}))
        .use(cors({ origin: '*'}))
// }
// all routes
app.use('/', require('./routes'));

// passport
if (mode === "production") require("./helpers/passport").init(passport);

//error handling
process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

// initilization and connection to DB
mongodb.initDb((err) => {
    if(err) {
        console.log(err);
    } else {
        app.listen(port, () => {console.log(`Web Server is listening at port ${port}`)});
    }
});