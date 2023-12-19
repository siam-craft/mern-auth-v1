import User from "../../models/user.model.js";
import { makeHashPassword } from "../../utils/makeHashPassword.js";

export const updateUserInDatabase = async (userId, userData) => {
  try {
    if (userData.password) {
      userData.password = makeHashPassword(userData.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          username: userData.username,
          email: userData.email,
          password: userData.password,
          profilePicture: userData.profilePicture,
        },
      },
      {
        new: true,
      },
    );

    return updatedUser;
  } catch (error) {
    throw error;
  }
};
