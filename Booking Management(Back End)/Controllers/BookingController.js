const User = require("../Model/BookingModel");
//data display
const getAllUsers = async (req, res, next) => {
    let Users;

    try{
        Users = await User.find();
    }catch (err) {
        console.log(err);
    }

    //not found
    if(!Users){
        return res.status(404).json({message:"Booking Requests not found"});

    }

    //display all user requests
    return res.status(200).json({Users});
};

//data insert
const addUsers = async (req, res, next) => {
   const {FirstName, LastName,  ContactNumber,  Email, BookingDate, SafariType,  NoOfAdults, NoOfKids, Nationality }= req.body;


   let users;

   try{
    users = new User({FirstName, LastName,  ContactNumber,  Email, BookingDate, SafariType,  NoOfAdults, NoOfKids, Nationality});
    await users.save();
   }catch (err) {
    console.log(err);
   }
   //not insert
      if (!users){
        return res.status(404).json({message:"unable to add bookings "});

      }
      return res.status(200).json({users});

};
//Get by Id
const getById = async (req, res, next) => {
    const id = req.params.id;

    let user;

    try{
        user = await User.findById(id);
    }catch (err){
        console.log(err);
    }
    //not vailable request
    if (!user){
        return res.status(404).json({message:"user not found "});

      }
      return res.status(200).json({user});
};

//update booking details
const updateUser = async (req, res, next) =>{
    const id = req.params.id;
    const {FirstName, LastName,  ContactNumber,  Email, BookingDate, SafariType,  NoOfAdults, NoOfKids, Nationality}= req.body;

    let users;

    try{
        users = await User.findByIdAndUpdate(id,{FirstName, LastName,  ContactNumber,  Email, BookingDate, SafariType,  NoOfAdults, NoOfKids, Nationality});
        users = await users.save();
    }catch(err) {
        console.log(err);
    }
    if (!users){
        return res.status(404).json({message:"unable to update booking details "});

      }
      return res.status(200).json({users});
};

//Delete User details
const deleteUser = async (req, res, next) =>{
    const id = req.params.id;

    let users;

    try{
        users = await User.findByIdAndDelete(id);
    }catch(err) {
        console.log(err);
    }
    if (!users){
        return res.status(404).json({message:"unable to Delete booking details "});

      }
      return res.status(200).json({users});
};


exports.getAllUsers = getAllUsers;
exports.addUsers = addUsers;
exports.getById = getById;
exports.updateUser= updateUser;
exports.deleteUser = deleteUser;