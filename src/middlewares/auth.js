const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GithubStrategy = require('passport-github2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user/user.schema');

const config = require('../config/config');
const passport = require('passport');

const GOOGLE_CLIENT_ID = config.GOOGLE_CLENT_ID;
const GOOGLE_CLIENT_SECRET = config.GOOGLE_CLIENT_SECRET;

const GITHUB_CLIENT_ID = config.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = config.GITHUB_CLIENT_SECRET;

const FACEBOOK_APP_ID = config.FACEBOOK_APP_ID;
const FACEBOOK_APP_SECRET = config.FACEBOOK_APP_SECRET;

authUser = (request, accessToken, refreshToken, profile, done) => {
  console.log(profile.displayName);
  return done(null, profile);
};

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/v1/user/auth/google/callback',
      passReqToCallback: true,
      state: true,
      scope: ['profile', 'email'],
    },
    authUser
  )
);

passport.use(
  new GithubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: '/auth/github/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: '/auth/facebook/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      done(null, profile);
    }
  )
);
passport.serializeUser((user, done) => {
  if (user) return done(null, user);
  else return done(null, false);
}),
  passport.deserializeUser((user, done) => {
    console.log(user);
    if (user) return done(null, user);
    else return done(null, false);
  }),
  (module.exports = passport);
