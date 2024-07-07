import UserModel from '../models/user.js'
import bcryptjs from 'bcrypt'


export const getAllUser = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const userData = await UserModel.find().skip(skip).limit(limit);
        const totalUsers = await UserModel.countDocuments();
        const totalPages = Math.ceil(totalUsers / limit);

        res.status(200).json({
            status: "success",
            userList: userData,
            totalPages: totalPages,
            currentPage: page,
            totalUsers: totalUsers
        });
    } catch (error) {
        res.status(400).json({ msg: "Something went wrong." });
    }
}




export const deleteUser = async(req,res)=>{
    try{
        console.log(req.params.id)
        const userId=req.params.id;
        const user= await UserModel.findByIdAndDelete({_id: userId})
        if (!user){
            res.status(404).json({message:"user not found"})
        }
        res.status(200).json({message:"user deleted successfully",user})
        console.log(error)


    }catch(error){

    }

}
export const AddUser = async(req,res)=>{
    try{
        const {fname,lname,email,password,role}=req.body;
        const existUser =await UserModel.findOne({email});
        
        if (existUser){
            return res.status(401).json({message:"User Already Exist"});
        }
        const hasepassword = await bcryptjs.hashSync(password, 10);
        const newUser =UserModel({
            fname,
            lname,
            email,
            password : hasepassword,
            role

        });
        await newUser.save()
        res.status(200).json({ message: "user Added successfully", newUser });


    }catch(error){
        res.status(500).json({ success: false, message: "internal server error" });
        console.log(error);

    }
};

export const EditUser = async (req, res) => {
    try {
    
        const id  = req.query.id; 
        console.log(req.query.id)
      const { fname, lname, email, password, role } = req.body;
  
      const existUser = await UserModel.findById(id);
  
      if (!existUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      
      if (email && email !== existUser.email) {
        const emailTaken = await UserModel.findOne({ email });
        if (emailTaken) {
          return res.status(401).json({ message: "Email already in use" });
        }
      }
  
      
      let hashedPassword = existUser.password;
      if (password) {
        hashedPassword = bcryptjs.hashSync(password, 10);
      }
  
     
      const updatedUser = await UserModel.findByIdAndUpdate(
        id,
        {
          fname: fname || existUser.fname,
          lname: lname || existUser.lname,
          email: email || existUser.email,
          password: hashedPassword,
          role: role || existUser.role,
        },
        { new: true } 
      );
  
      res.status(200).json({ message: "User updated successfully", updatedUser });
  
    } catch (error) {
      res.status(500).json({ success: false, message: "Internal server error" });
      console.log(error);
    }
  };