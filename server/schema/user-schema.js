const mongoose = require('mongoose');
// const autoincrement = require('mongoose-auto-increment')

const userSchema = mongoose.Schema({
  
    firstname: {
    type:String,required:true
    },
    lastname: {
        type:String,required:true
        },
 
    email: {
        type:String , required:true
    },
    phone: {
        type:String,required:true
    },
    address1: {
        type:String,required:true
    },
    address2: {
        type:String,required:true
    },
    state: {
        type:String,required:true
    },
    city: {
        type:String,required:true
    },
    country:[ {
        type:String,required:true
    }],
    zipcode: {
        type:String,required:true 
    }

});



const User = mongoose.model('User', userSchema); 

module.exports = User;





