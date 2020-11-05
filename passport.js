import { Strategy } from "passport-local";
//fake data

const passportConfig = passport => {
  console.log("passportConfig");

  passport.serializeUser((user, done) => {
    console.log("serializeUser");
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    console.log("deserializeUser");
    done(null, user);
  });

  passport.use(
    new Strategy(
      {
        usernameField: "username",
        passwordField: "password",
        session: true,
        passReqToCallback: false,
      },
      function (username, password, done) {
        console.log("start");
        try {
          if (username) {
            return done(null, {
              user_id: username,
              password,
            });
          } else {
            return done(false, null);
          }
        } catch (error) {
          return done(false, null);
        }
      }
    )
  );
};
export default passportConfig;
