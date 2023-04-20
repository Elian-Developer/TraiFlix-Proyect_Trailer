const express = require("express");
const path = require('path');
const app = express();
const _handlebars = require('handlebars')
const expressHbs = require('express-handlebars');
const trailerRouter = require('./routes/trailer');
const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user')
const morgan = require('morgan');
require('./database/dbConnection');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
require('./config/passport')


//body format
app.use(express.urlencoded({extended: false})); 

//static file configurations
app.use(express.static(path.join(__dirname, "public")));

// View Engine configurations
app.engine("hbs", expressHbs({
    layoutsDir:'views/layouts', defaultLayout: 'main-layout', extname: 'hbs', 
    handlebars: allowInsecurePrototypeAccess(_handlebars)
}));
app.set("view engine", "hbs");
app.set("views", "views");

//Middlewares to sessions
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'secret',
    cookie: { secure: false, maxAge: 14400000 }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); 

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

//Middlewares
app.use(morgan('dev'));
app.use(adminRouter);
app.use(trailerRouter);
app.use(userRouter);
app.use(express.json())


//Global Variables
/* app.use((req, res, next) => {
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
}); */

app.use(function(req, res, next){
    res.status(404).render('404', {layout: false})
})

const port = 5000;

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});



/* app.get('/', (req, res) => {
    res.send('<h1>Helllo World</h1>')
}); */

/* app.use('/', (req, res, next) => {
    res.render("shop", {title: "Trailers" , layout: false });
}); */