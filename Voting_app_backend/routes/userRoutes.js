const express = require('express');
const router = express.Router();
const User = require('./../models/user');
const {jwtMiddleware, generateToken} = require('./../jwt');

//Post route to add a person
router.post('/signup',async(req, res) =>{
    try{
       const data = req.body

       const newUser = new User(data);
       const response = await newUser.save();
       console.log('data saved');
        
       const payload = {
        id: response._id
       };
        console.log(JSON.stringify(payload));
        const token = generateToken(payload);
        console.log('Token generated:', token);

       res.status(200).json({response: response, token: token});
   }
  catch(err){
       console.log(err);
       res.status(500).json({error: 'Internal Server Error'});
  }
})

//Login route to authenticate a person
router.post('/login', async(req, res) => {
    try{
        const {aadharCardNumber, password} = req.body;
        //Find the person by username
        const user = await User.findOne({aadharCardNumber: aadharCardNumber});

        // If user not found or password does not match, return error
        if( !user || !(await user.comparepassword(password))) {
            return res.status(401).json({error: 'Invalid username or password'});
        }

        // If authentication is successful, generate a token
        const payload = {
            id: user._id,
        };
        const token = generateToken(payload);
        //return token as response
        res.json({token})
    }catch(err){
        console.error('Error during login:', err);
        res.status(500).json({error: 'Internal Server Error'});
    }
});

//profile route to get the authenticated user's details
router.get('/profile', jwtMiddleware, async(req, res) => {
    try{
        const userData = req.user; 

        const userId = userData.id; 
        const user = await person.findById(userId);
        res.status(200).json({user});
    }catch(err){
        console.error({error: 'Internal Server Error'});
    }
});


router.put('/profile/password', jwtMiddleware ,async (req,res)=>{
    try{
        const userId = req.user;
        const {currentPassword, newPassword} = req.body
       
        const user = await User.findById(userId);

        if(!(await user.comparepassword(currentPassword))){
            return res.status(401).json({error: 'Invalid username or password'});
        }

        user.password = newPassword;
        await user.save();

        console.log('password updated');
        res.status(200).json({message: "Password updated"});
    }catch(err){
        console.log(err);
         res.status(500).json({error: 'Internal Server Error'});
    }
})

module.exports = router;

