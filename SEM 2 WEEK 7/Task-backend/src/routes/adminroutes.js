const express=require('express');
const {signUpAdmin,logInAdmin,logOutAdmin} =require('../controllers/queries');

const router = express.Router();

router.post('/signupAdmin', signUpAdmin);    // Signup Admin
router.post('/loginAdmin', logInAdmin);      // Login Admin
router.get('/logoutAdmin', logOutAdmin);     // Logout Admin

module.exports=router;