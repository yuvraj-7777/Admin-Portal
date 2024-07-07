import UserModel from "../models/user.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { fname, lname, email, password } = req.body;
    const existUser = await UserModel.findOne({ email });
    if (existUser) {
      return res
        .status(401)
        .json({ success: false, message: "User already Exist" });
    }
    const hasepassword = await bcryptjs.hashSync(password, 10);
    const newUser = UserModel({
      fname,
      lname,
      email,
      password: hasepassword,
    });
    await newUser.save();
    res.status(200).json({ message: "user register successfully", newUser });
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server error" });
    console.log(error);
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid credentials" });
    }
    const ispasswordValid = await bcryptjs.compare(password, user.password);

    if (!ispasswordValid) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid credentials" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRETE);
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      maxAge: 3600000,
    });
    res.status(200).json({ message: "Login Successfully", user, token });
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server error" });
    console.log(error);
  }
};
export const Logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "user logout successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "internal server error" });
    console.log(error);
  }
};
