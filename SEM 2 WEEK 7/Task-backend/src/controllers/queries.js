const bcrypt =require('bcrypt');
const Admin =require('../models/adminSchema.js');
const generateTokenSetCookie=require('../utils/generateToken.js');
// ---------- Admin sign up ----------
 const signUpAdmin = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await Admin.findOne({ userName });

    if (user) {
      return res.status(400).json({ error: 'User Already Exists' });
    }

    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new Admin({
      userName,
      password: hashPassword,
    });

    if (newUser) {
      // Generate JWT tokens
      generateTokenSetCookie(newUser._id, res);
      await newUser.save();
      console.log('New Admin Created');
      res.status(201).json({
        _id: newUser._id,
        userName: newUser.userName,
      });
    } else {
      res.status(400).json({ error: 'Invalid user data' });
    }
  } catch (error) {
    console.log('Error in Signup controller', error.message);
    res.status(500).json({ error: 'Internal Server error' });
  }
};

// ---------- Admin Login ----------
 const logInAdmin = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await Admin.findOne({ userName });
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ success: false, error: 'Invalid Username or Password' });
    }

    generateTokenSetCookie(user._id, res);

    console.log('Admin Logged In', user);
    res.status(200).json({ success: true, userName: user.userName });
  } catch (error) {
    console.log('Error in Login controller', error.message);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

// ---------- Admin Logout ----------
 const logOutAdmin = (req, res) => {
  try {
    console.log('Admin Log Out');
    res.cookie('jwt', '', { maxAge: 0 });
    res.status(200).json({ message: 'Logged Out Successfully' });
  } catch (error) {
    console.log('Error in Login controller', error.message);
    res.status(500).json({ error: 'Internal Server error' });
  }
};
module.exports={signUpAdmin,logInAdmin,logOutAdmin}