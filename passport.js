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
            //이부분에서 나중에 username데이터가 DB에 들어가있는지 또는 검증이되는 username인지 체크하는 로직이 필요합니다.
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
