import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import { makeUniqueUserName } from "../utils/makeUniqueUserName.js";

export const singup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    next(err);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User not found"));
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials"));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: _password, ...others } = validUser._doc;
    const expirationDate = new Date(Date.now() + 60 * 60 * 1000);

    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: expirationDate,
      })
      .status(200)
      .json(others);
  } catch (err) {
    next(err);
  }
};

export const signinGoogle = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: _password, ...others } = user._doc;
      const expirationDate = new Date(Date.now() + 60 * 60 * 1000);
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expirationDate,
        })
        .status(200)
        .json(others);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

      const newUser = new User({
        username: makeUniqueUserName(req.body.name),
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo,
      });
      const savedNewUser = await newUser.save();
      console.log(savedNewUser, "savedNewUser");
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: _password, ...others } = savedNewUser._doc;
      const expirationDate = new Date(Date.now() + 60 * 60 * 1000);
      res
        .cookie("access_token", token, {
          httpOnly: true,
          expires: expirationDate,
        })
        .status(200)
        .json(others);
    }
  } catch (err) {
    next(err);
  }
};
