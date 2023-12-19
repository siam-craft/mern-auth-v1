import User from "../models/user.model.js";
import { updateUserInDatabase } from "../repo/user/userUpdate.js";

export const test = (req, res) => {
  res.json({
    message: "API is working",
  });
};

// update user
export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return res.status(401).json("you can update only your account");
  }

  try {
    const updatedUser = await updateUserInDatabase(req.params.id, req.body);
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }

  // try {
  //   if (req.body.password) {
  //     req.body.password = bcryptjs.hashSync(req.body.password, 10);
  //   }
  //   const updatedUser = await User.findByIdAndUpdate(
  //     req.params.id,
  //     {
  //       $set: {
  //         username: req.body.username,
  //         email: req.body.email,
  //         password: req.body.password,
  //         profilePicture: req.body.profilePicture,
  //       },
  //     },
  //     {
  //       new: true,
  //     },
  //   );
  //   const { password, ...rest } = updatedUser._doc;
  //   res.status(200).json(rest);
  // } catch (error) {
  //   next(error);
  // }
};
