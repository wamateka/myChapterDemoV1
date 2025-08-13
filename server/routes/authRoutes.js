import express from 'express';
import passport from 'passport';
import { addMember } from '../controllers/memberControler.js';

const router = express.Router();

router.post(
    '/login', 
    passport.authenticate('local', {failWithError: true}), 
    (req,res)=>{
        res.status(200).json({user: req.user})
    }, 
    (err, req, res, next) =>{
        if(err) return res.status(500).json({ message: 'Invalid Credentials' });
    }
);
router.post('/logout', (req,res)=>{
    req.logout(err => {
        if (err) return res.status(500).send("error")
        res.sendStatus(200);
    })
});
router.post('/signup', addMember, (req,res)=>{
    const user = req.user
    req.login(user, (err)=>{
        if(err){
            // console.log('user to serialize: ',user)
            // console.error('Login after signup failed: ', err);
            res.status(500).json({ error: '' })
        }else{ 
            // console.log("success")
            res.status(201).json({ message: 'User registered and logged in', user })
        }
    })
});
router.get('/me', (req,res)=>{
    console.log(req.user)
    if(req.isAuthenticated()){
        console.log(req.user)
        res.status(200).json(req.user)
    }else{
        res.status(401).json({message: 'Not authorized' })        
    }
});

export default router;