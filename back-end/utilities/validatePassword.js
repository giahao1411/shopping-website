const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!password || !passwordRegex.test(password)) {
        return false;
    }
    return true;
};

module.exports = validatePassword;
