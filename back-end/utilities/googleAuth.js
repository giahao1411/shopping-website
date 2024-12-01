const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

const User = require("../models/UserModel");

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:8080/social/google/callback",
            passReqToCallback: true,
        },
        async (request, accessToken, refreshToken, profile, done) => {
            try {
                let user = await User.findOne({ email: profile.email });

                if (!user) {
                    user = await User.create({
                        username:
                            profile.displayName || profile.email.split("@")[0],
                        email: profile.email,
                        password: "google_auth",
                        role: "user",
                        status: "active",
                    });
                }

                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});
