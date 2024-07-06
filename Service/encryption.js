const util = require('util');
const crypto = require('crypto');

const randomBytesPromise = util.promisify(crypto.randomBytes);
const pbkdf2Promise = util.promisify(crypto.pbkdf2);

const createSalt = async () => {
    const buf = await randomBytesPromise(64);
    return buf.toString('base64');
};

const createHashedPassword = async (password) => {
    const salt = await createSalt();
    const key = await pbkdf2Promise(password, salt, 13191, 64, 'sha512');
    const hashedPassword = key.toString('base64');

    return { hashedPassword, salt };
};

const verifyPassword = async (enteredPassword, userSalt, hashedPassword) => {
    const key = await pbkdf2Promise(enteredPassword, userSalt, 13191, 64, 'sha512');
    const functionPassword = key.toString('base64');

    if (functionPassword === hashedPassword) return true;
    return false;
};

module.exports = { createHashedPassword, verifyPassword };