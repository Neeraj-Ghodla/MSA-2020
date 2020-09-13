const LocalStrategy = require("passport-local").LocalStrategy;
const bcrypt = require("bcryptjs");

// Load User Model
const User = require("../model/User");

interface IUser {
  _id: Number;
  email: String;
  password: String;
  likedMovies: Array<String>;
  dislikedMovies: Array<String>;
  date: Date;
}

module.exports = (passport: any) => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      async function (email: String, password: String, done: Function) {
        try {
          const user = await User.findOne({ email });
          if (!user) done(null, false);
          else
            bcrypt.compare(
              password,
              user.password,
              (err: Error, isMatch: Boolean) => {
                if (err) throw err;
                else if (isMatch) return done(null, user);
                else return done(null, false);
              }
            );
        } catch (error) {
          console.log(error);
        }
      }
    )
  );

  passport.serializeUser(function (user: IUser, done: Function) {
    done(null, user._id);
  });

  passport.deserializeUser(function (id: Number, done: Function) {
    User.findById(id, function (err: Error, user: IUser) {
      done(err, user);
    });
  });
};
