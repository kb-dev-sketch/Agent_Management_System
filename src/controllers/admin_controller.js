const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const registerAdmin=async(req,res)=>{
    // get user details from frontend
    // validation of user details 
    // chech if user is already registered 
    //if not registered then save the user in database 
    // check for user creation 
    // return response 
    try{
    const {email,password}=req.body;
    console.log("Received registration request with email:", email);

    if(!email || !password){
        return res.json({
            message:"Email and password are required"
        })
    }
    const existedUser=await User.findOne({
        email:email
    })
    if(existedUser){
        return res.json({
            message:"User already exists"
        })
    }


    // hash password
    const hashedPassword=await bcrypt.hash(password,10);
   const newUser=await User.create({
    email:email,
    password:hashedPassword
   })
   
   if(!newUser){
    return res.json({
        message :'problem in new user creation'
    })
   }
 return res.status(201).json({
       message:"User registered successfully",
       user:{
        id:newUser._id,
        email:newUser.email
       }
   })
}
catch (error){
console.error("Error during registration:",error.message);
return res.status(500).json({
    message:"Internal server error"
})
}
}
// login,compare hashpassord and generate token
const loginAdmin=async(req,res)=>{
    const{email,password}=req.body;
    try{
        if(!email || !password){
            return res.status(400).json({
                message:"email and password both are required"
            })
        }
        const user=await User.findOne({
            email:email,
        })
        if(!user){
            return res.status(401).json({
                message:"Invalid email or password"
            })
        }
        const isPasswordCorrect= await bcrypt.compare(
            password,
            user.password
        )
        if(!isPasswordCorrect){
            return res.json({
                message:"Invalid email or password"
            })
        }
        // token generation
        const token=jwt.sign({
            id:user._id,
            email:user.email
        },
    process.env.JWT_SECRET,
{
    expiresIn:"7d"
})
        return res.json({
            message:"Login successfull",
            token,
            user:{
                id:user._id,
                email:user.email
            }
        })
    }
catch(error){
    console.log(error);
    return res.status(500).json({
        message:"Internal server error"
    })
}
}
const logoutAdmin = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
module.exports={
    registerAdmin,
    loginAdmin,
    logoutAdmin
}