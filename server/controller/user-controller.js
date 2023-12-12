const User = require('../schema/user-schema');

module.exports.adduser = async (req, res) => {
    const data = req.body;
console.log(req.body)
    const newuser = new User(data);

    try {
      await  newuser.save();
        res.status(201).json({ message: 'User added successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports.getall = async (req,res) => {

try {
    
    const data = await User.find({})
    res.status(200).json(data)

} catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
}

}

module.exports.getuser = async (req,res) => {

console.log(req.params.id);

    try {
    
        // const data = await User.find({_id: req.params.id})
        const data = await User.findById(req.params.id)
        res.status(200).json(data)
    
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

module.exports.edituser =  async (req, res) => {
    
    let user = req.body;
    console.log(req.body);
    const edituser = new User(user)

    try {
        await User.updateOne({ _id: req.params.id }, edituser);
        res.status(200).json(edituser)
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });

    }

}

module.exports.deleteuser = async (req, res) => {
    
    
    try {
        await User.deleteOne({ _id: req.params.id })
        res.status(200).json({message:"user deleted successfully"})
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}









  

