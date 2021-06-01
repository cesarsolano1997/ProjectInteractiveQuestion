let SessionClassroom = require("../../models/SessionClassroom");
const FindClass = async (idClass) => {
  const USERSDB = await SessionClassroom.find({ classroom: idClass });

  const users = USERSDB.map((user) => ({
    userID: user._id,
    username: user.userName,
  }));

  return users;
};

module.exports = {
  FindClass,
};
