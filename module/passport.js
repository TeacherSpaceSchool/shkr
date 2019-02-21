const passport = require('passport');
const LocalStrategy = require('passport-local');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwtsecret = '@615141ViDiK141516@';
const UserMuseumKNMII = require('../models/userMuseumKNMII');
const jwt = require('jsonwebtoken');

let start = () => {
//настройка паспорта
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
            session: false
        },
        function (email, password, done) {

            UserMuseumKNMII.findOne({email}, (err, user) => {
                if (err) {
                    return done(err);
                }
                console.log(!user, !user.checkPassword(password), user.status!='active')
                if (!user || !user.checkPassword(password) || user.status!='active') {
                    return done(null, false, {message: 'Нет такого пользователя или пароль неверен.'});
                }
                return done(null, user);
            });
        }
        )
    );
    const jwtOptions = {};
    jwtOptions.jwtFromRequest= ExtractJwt.fromAuthHeaderAsBearerToken();
    jwtOptions.secretOrKey=jwtsecret;
    passport.use(new JwtStrategy(jwtOptions, function (payload, done) {
            UserMuseumKNMII.findOne({email:payload.email}, (err, user) => {
                if (err) {
                    return done(err)
                }
                if (user) {
                    return done(null, user)
                } else {
                    return done(null, false)
                }
            })
        })
    );
}

const verifydeuser = async (req, res, func) => {
    await passport.authenticate('jwt', async function (err, user) {
        try{
            if (user) {
                await func()
            } else {
                console.error('No such user')
                res.status(401);
                res.end('No such user');
            }
        } catch (err) {
            console.error(err)
            res.status(401);
            res.end('err')
        }
    } )(req, res)
}

const signinuser = (req, res) => {
    passport.authenticate('local', async function (err, user) {
        try{
            if (user == false) {
                res.status(401);
                res.end('Login failed',401)
            } else {
                const payload = {
                    id: user._id,
                    email: user.email,
                    role: user.role
                };
                const token = await jwt.sign(payload, jwtsecret); //здесь создается JWT
                res.status(200);
                res.end(token);
            }
        } catch (err) {
            console.error(err)
            res.status(401);
            res.end('email not be unique')
        }
    })(req, res);
}


module.exports.start = start;
module.exports.verifydeuser = verifydeuser;
module.exports.signinuser = signinuser;