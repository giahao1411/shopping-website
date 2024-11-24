const validator = require("validator");

const validateEmail = (email) => {
    if (!email || !validator.isEmail(email)) {
        return false;
    }
    return true;
};

module.exports = validateEmail;
