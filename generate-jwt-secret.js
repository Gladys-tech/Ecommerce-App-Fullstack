// const crypto = require('crypto');
import crypto from 'crypto';

// Generate a random JWT secret of 256 bits (32 bytes)
const jwtSecret = crypto.randomBytes(32).toString('hex');

console.log(`Generated JWT Secret: ${jwtSecret}`);
