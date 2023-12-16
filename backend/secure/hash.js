const bcrypt = require("bcryptjs");
const saltRounds = 10;
const hashGenerate = async (plainpassword) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(plainpassword, salt);
    return hash;
  } catch (error) {
    return error;
  }
};
const hashValidator = async (plainpassword, hashedPassword) => {
  try {
    console.log(plainpassword, hashedPassword);
    const result = await bcrypt.compare(plainpassword, hashedPassword);
    console.log(result);
    return result;
  } catch (error) {
    return false;
  }
};
module.exports.hashGenerate = hashGenerate;
module.exports.hashValidator = hashValidator;