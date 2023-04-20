const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const User = require('../models/user')

passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {

   // Confirm if email user exist
    const user = await User.findOne({email});  //searching user in DB

    if(!user) {
      return done(null, false, {message: 'Not User Found'});
    } else{
        //Match user password
       const match = await user.matchPassword(password);
       if(match) {
        return done(null, user)
       } else{
        return done(null, false, {message: 'Incorrect Password'})
       }
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id)
});

/* passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    })
}); */

passport.deserializeUser((id, done) => {
    User.findById(id).exec()
      .then(user => done(null, user))
      .catch(err => done(err));
  });