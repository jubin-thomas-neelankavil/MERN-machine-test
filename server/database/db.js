const mongoose = require('mongoose')


 const connectToDatabase = async (username,password,dbName) => {

    const URL = `mongodb+srv://user2000:test234@cluster0.hbnii2i.mongodb.net/?retryWrites=true&w=majority`;

try {
    
await mongoose.connect(URL)
console.log('database connected successfully');
} catch (error) {
    console.log('Error while connecting with the database',error);
}

}


module.exports = connectToDatabase;