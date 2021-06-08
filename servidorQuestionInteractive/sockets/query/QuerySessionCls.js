let SessionClassroom = require("../../models/SessionClassroom");

exports.FindClass = async (idClass) => {
  const USERSDB = await SessionClassroom.find({ classroom: idClass })
    .where("isLogged")
    .equals(true);

  const users = USERSDB.map((user) => ({
    userID: user._id,
    username: user.userName,
  }));

  return users;
};

exports.FindUsersClass = async (userId) => {
  console.log(userId);
  let userDB = await SessionClassroom.findOne({ userId: userId });
  console.log(userDB);

  return userDB;
};

exports.UpdateUserClass = async (userClass) => {
  const userUpdate = await SessionClassroom.findOneAndUpdate(
    { _id: userClass._id },
    userClass,
    {
      new: true,
    }
  );

  return userUpdate;
};
