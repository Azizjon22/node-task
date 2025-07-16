// Kamida 8ta belgidan iborat bo‘lishi kerak, katta harf, kichik harf va raqam bo‘lishi kerak
module.exports = function isStrongPassword(password) {
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return strongRegex.test(password);
  };
  