const mongoose = require('mongoose');
//const { type } = require('os');
const bcrypt = require('bcrypt');
// Define the Person schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    email:{
        type: String  
    },
    mobile: {
        type: String
    },
    aadharCardNumber: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'voter'],
        default: 'voter'
    },
    isVoted: {
        type: Boolean,
        default: false
    }
});

userSchema.pre('save', async function(next) {
    const person = this;
    if(!person.isModified('password')) return next(); 

    try{
       // hash password generation
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(person.password, salt);
        person.password = hashedpassword; // Store the hashed password
        next();
    }catch(err){
    return next(err);
    }
})

userSchema.methods.comparepassword = async function(candidatepassword) {
    try{
        const isMatch = await bcrypt.compare(candidatepassword, this.password);
        return isMatch; // Return true if passwords match, false otherwise
    }catch(err){
        throw new Error('Error comparing password');
    }
}
const User = mongoose.model('User', userSchema); 
module.exports = User;