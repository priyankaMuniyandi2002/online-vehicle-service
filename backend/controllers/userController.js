/** TAC SERVICE BOOKING APP BACKEND USER CONTROLLER FILE **/

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

/* Importing the user database Schema Model into the user controller file */
const User = require("../models/userModel");
const vehicle = require("../models/vehicle");
const bookingModel = require("../models/bookingModel");

const createToken = (_id) => {
  console.log("createToken function called",process.env.SECRET);
  
  return jwt.sign({ _id }, process.env.SECRET||"createToken", { expiresIn: "3d" });
};

/* CREATE USER ACCOUNT CONTROLLER FUNCTION */
const userCreateAcc = async (req, res) => {

  const { firstName, lastName, email, password,role } = req.body;

  try {
    const user = await User.createAcc(firstName, lastName, email, password,role);

    // generating a json web token (jwt)
    const token = createToken(user._id);

    res.status(200).json({ firstName, lastName, email,role, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

/* USER LOGIN CONTROLLER FUNCTION */
const userLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // generating a json web token (jwt)
    const token = createToken(user._id);

    const { firstName, lastName,role , _id } = user;

    res.status(200).json({ firstName, lastName, email, token,role,_id });
  } catch (error) {
    res.status(400).json({
      message: "login-error-response",
      error: error.message,
    });
  }
};


const admindetail=async (req,res)=>{

  const users= await User.find()
  const vehicles=await vehicle.find()
  const totalbooking=await bookingModel.find()
  const completedservices=(await bookingModel.find()).filter(booking=>booking.status==="COMPLETED")
  const pendingservices=(await bookingModel.find()).filter(booking=>booking.status==="IN-PROGRESS")
  
  const dashboarddetails={
    userscount:users.length,
    vehiclescount:vehicles.length,
    allbookingcount:totalbooking.length,
    completedservicescount:completedservices.length,
    pendingservicescount:pendingservices.length
  }

  res.status(200).json(dashboarddetails);

}

const getallusers=async(req,res)=>{

  const users= await User.find()

  res.status(200).json(users);


}

module.exports = { userCreateAcc, userLogin,admindetail,getallusers };
