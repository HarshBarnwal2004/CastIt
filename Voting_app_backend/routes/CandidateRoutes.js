const express = require('express');
const router = express.Router();
const User = require('../models/user');
const {jwtMiddleware, generateToken} = require('../jwt');
const Candidate = require('../models/candidate');


const checkAdminRole = async (userID) => {
    try{
        const user = await User.findById(userID);
        if(user && user.role === 'admin') {
            return true;
        }
    }catch(err){
        return false;
    } 
}


router.post('/',jwtMiddleware , async(req, res) =>{
    try{
        if(! await checkAdminRole(req.user.id)) 
            return res.status(403).json({error: 'User does not have admin role'});

       const data = req.body // Assuming data contains candidate details

       const newcandidate = new Candidate(data);
       const response = await newcandidate.save();
       console.log('data saved');
       res.status(200).json({response: response});
   }
  catch(err){
       console.log(err);
       res.status(500).json({error: 'Internal Server Error'});
  }
})



router.put('/:candidateID',jwtMiddleware, async (req,res)=>{
    try{
        if(! await checkAdminRole(req.user.id)) 
            return res.status(403).json({error: 'User has not admin role'});

        const candidateID = req.params.candidateID;
        const updatedCandidateData = req.body;
        const response = await Candidate.findByIdAndUpdate(candidateID, updatedCandidateData, {
            new: true,
            runValidators: true,

        })

        if (!response){
            return res.status(404).json({ error: 'Candidate not found'});
        }
        console.log('Candidate data updated');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
         res.status(500).json({error: 'Internal Server Error'});
    }
})


router.delete('/:candidateID',jwtMiddleware, async (req,res)=>{
    try{
        if(! await checkAdminRole(req.user.id)) 
            return res.status(403).json({error: 'User does not have admin role'});

        const candidateID = req.params.candidateID;
       
        const response = await Candidate.findByIdAndDelete(candidateID);

        if (!response){
            return res.status(404).json({ error: 'Candidate not found'});
        }
        console.log('Candidate data deleted');
        res.status(200).json(response);
    }catch(err){
        console.log(err);
         res.status(500).json({error: 'Internal Server Error'});
    }
})

// let's start voting
router.post('/vote/:candidateID', jwtMiddleware, async (req, res) => {
    //no admin can vote
    //user can vote only once
    candidateID = req.params.candidateID;
    userID = req.user.id;

    try{
        //FInd the Candidate document with the specified candidateID
        const candidate = await Candidate.findById(candidateID);
        if (!candidate) {
            return res.status(404).json({ error: 'Candidate not found' });
        }

        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        if (user.isVoted) {
            return res.status(403).json({ error: 'User has already voted' });
        }
        if(user.role === 'admin') {
            return res.status(403).json({ error: 'Admin cannot vote' });
        }

        candidate.votes.push({user: userID})
        candidate.voteCount += 1;
        await candidate.save();
        // update the user document to mark as voted
        user.isVoted = true;
        await user.save();

        res.status(200).json({ message: 'Vote cast successfully', candidate });

    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

//vote count
router.get('/vote/count',async (req, res) => {
    try{
        const candidates = await Candidate.find().sort({voteCount: 'desc'});

        const voteRecord = candidates.map((data) => {
            return {
                party: data.party,
                voteCount: data.voteCount,
            }
        });

        return res.status(200).json({voteRecord});
    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/candidate', async (req, res) => {
    try{
        // Fetch all candidates from the database
        const candidates = await Candidate.find();
        res.status(200).json({candidates});
    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}) 

module.exports = router;

