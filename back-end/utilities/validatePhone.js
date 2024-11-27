const validatePhone = (phone) => {
    const phoneRegex = /^0\d{9}$/;

    if (!phone || !phoneRegex.test(phone)) {
        return false;
    }
    return true;
};

module.exports = validatePhone;
