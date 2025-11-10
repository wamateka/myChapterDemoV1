// server/passport-config.js
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import bcrypt from 'bcrypt'
import { getMemberByEmail, getMemberById } from './controllers/memberControler.js';
import axios from 'axios'
const BASE_URL = 'http://localhost:3000/api/members'
passport.use(new LocalStrategy({ usernameField: 'email' }, async function verify(email, password, cb) {
    
    const results = await axios.get(`${BASE_URL}/email/${email}`);
    const user = results.data.data;
    if (!user) return cb(null, false, { message: 'no user found' })

    const match = await bcrypt.compare(password, user.login_password)
    if (!match) return cb(null, false, { message: 'wrong password' })

    return cb(null, user);
}))
passport.serializeUser((user, done) => {
    // console.log('serializing : ',user)
    done(null, user.member_id)
})

passport.deserializeUser(async (id, done) => {
    try {
        const results = await axios.get(`${BASE_URL}/${id}`)
        const user = results.data.data;
        // console.log(user)
        done(null, user)
    }catch(err){
        console.error(err);
    }
})
