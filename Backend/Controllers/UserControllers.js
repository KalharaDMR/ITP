const User = require("../Model/UserModel.js");

//deta display
const getAllUsers = async (req, res, next) => {

    let users;
    // Get all users
    try{
        users = await User.find();
    }catch (err) {
        console.log(err);
    }

    // not found
    if(!users) {
        return res.status(404).json({ messsage:"User not found"});
    }
    
    //Display all users
    return res.status(200).json({users});
};

//data insert

const addUsers = async (req, res, next) => {

    const {type,date,time,title,name1,name2,email,phone,message} = req.body;

    let users;

    try{
        users = new User({type,date,time,title,name1,name2,email,phone,message});
        await users.save();
    }catch (err){
        console.log(err);
    }


    // not insert users

    if (!users){
        return res.status(404).send({message:"unable to add users"});
    }

    return res.status(200).json({ users });
};

//Get by Id
const getById = async (req, res, next) => {

    const id = req.params.id;

    let user;

    try {
        user = await User.findById(id);
    }catch (err) {
      console.log(err);
    }

   // not avilabale users
   if (!user){
        return res.status(404).send({message:"User Not Found"});
    }

    return res.status(200).json({ user });
}


//update user Details
const updateUser = async (req, res, next) => {

   const id = req.params.id;
   const { type,date,time,title,name1,name2,email,phone,message } = req.body;

   let users;

   try{
    users = await User.findByIdAndUpdate(id,
    { type: type, date: date, time:time, title: title, name1: name1, name2:name2, email:email, phone:phone, message:message});
    users = await users.save();
   }catch(err){
    console.log(err);
   }

   if (!users){
    return res.status(404).send({message:"unable to update user Details"});
   }

   return res.status(200).json({ users }); 

};

//Delete user Details
    const deleteUser = async (req, res, next) => {
    const id = req.params.id;

    let user ;

    try{
        user = await User.findByIdAndDelete(id)
    }catch (err) {
        console.log(err);
    }
    if (!user){
        return res.status(404).send({message:"unable to Delete user Details"});
       }
    
       return res.status(200).json({ user }); 
    
};

//expport route
exports.getAllUsers = getAllUsers;
exports.addUsers = addUsers;
exports.getById = getById;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
