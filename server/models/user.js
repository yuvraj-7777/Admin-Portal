import mongoose from "mongoose";

import bcrypt from "bcrypt";


const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  role:{
    type:String,
    enum:["admin","user"],
    default:"user"
  },
  password: {
    type: String,
    required: true,
  },
});


const UserModel = mongoose.model('user',userSchema);
export default UserModel;
