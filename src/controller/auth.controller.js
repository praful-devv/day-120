import authModel from "../models/auth.model.js";
import bcrypt from "bcrypt";
import { sendEmail } from "../services/mail.service.js";
import jwt from "jsonwebtoken";

export const registerController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const isUserExists = await authModel.findOne({
      $or: [{ username }, { email }],
    });

    if (isUserExists) {
      return res.status(409).json({
        message: "Invalid Credential",
        success: false,
        error: isUserExists.email
          ? "email already exists"
          : "username already taken",
      });
    }

    const hash = await bcrypt.hash(password, 12);

    const user = await authModel.create({
      username,
      email,
      password: hash,
    });

    const EmailVerificationToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRETS,
      { expiresIn: "15m" },
    );

    await sendEmail({
      to: email,
      subject: "wellcome to perplexity",
      html: `
      <p>hi ${user.username} thanks for registering to our perplexity</p>
      
      <a href="http://localhost:3000/api/auth/verify-email?token=${EmailVerificationToken}">Verify</a>
      `,
    });

    res.status(201).json({
      message: `${user.username} your accout created successfully`,
      success: true,
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    error.status = 409;
    next(error);
  }
};

export const verifyEmail = async (req, res, next) => {
  const { token } = req.query;
  const decode = jwt.verify(token, process.env.JWT_SECRETS);

  const user = await authModel.findOne({ _id: decode.id });

  if (!user) {
    return res.status(400).json({
      message: "Invalid Token",
      success: false,
      err: "user not found",
    });
  }

  user.is_verified = true;
  await user.save();

  const html = `
     <h1>Email verified successfull</h1>
     <p>your email has been verified</p>
     <a href="http://localhost:3000/login">click</a>`;

  res.send(html);
};

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const isEmailExists = await authModel.findOne({ email }).select("+password");

    if (!isEmailExists) {
      return res.status(401).json({
        message: "Invalid Credentials",
        err: false,
      });
    }

    const isPasswordMatched = await bcrypt.compare(password,isEmailExists.password);

    if (!isPasswordMatched) {
      return res.status(401).json({
        message: "Invalid Credentials",
        err: false,
      });
    }

    if (!isEmailExists.is_verified) {
      return res.status(401).json({
        message: "verify your email",
      });
    }

    const token = jwt.sign(
      {
        id: isEmailExists._id,
      },
      process.env.JWT_SECRETS,
      { expiresIn: "1h" },
    );

    res.cookie("token", token);

    res.status(200).json({
      message: "user login successfully",
      user:{
        username:isEmailExists.username,
        email:isEmailExists.email
      }
    });
  } catch (error) {   
      error.status = 401  
    next(error)
  }
};

export const getmeController = async(req,res,next)=>{
  
  const userId = req.user.id

  const user = await authModel.findOne({_id:userId})

  if(!user){
    return res.status(404).json({
      message:"user not found"
    })
  }

  res.status(200).json({
    message:"user details",
    user
  })




}
