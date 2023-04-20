const passport = require('passport'); 
const User = require('../models/user')

exports.renderLoginForm = (req, res, next) => {
    res.render('login');
}

exports.login = passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/trailer',
    failureFlash: true
})

exports.renderRegisterForm = (req, res, next) => {
    res.render('register');
}

exports.register = async (req, res, next) => {
    const errors = [];
    const success = [];
    const {name, email, password, confirmPassword} = req.body
    if(password != confirmPassword) {
        errors.push({text: 'Password do not match.'});
    }
    if(password.length < 4){
        errors.push({text: 'Password must contain 4 or more characters.'});
    }
    if(errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email
        })
    }else{
       const emailUser = await User.findOne({email: email});
       if(emailUser){
            errors.push({text: 'This email is alredy in use.'})
            res.render('register', {errors, name, password, confirmPassword})
       } else{
            const newUser = new User({name, email, password});
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            success.push({text: 'User registered successfully'});
            res.render('login', {success});
       }
    }
}

exports.logOut = (req, res, next) => {
    req.logout(function(err){
        if(err){return next(err); }
        req.flash('success_msg', 'You are logged out now.');
        res.redirect('/')
    });
}