const bcrypt = require('bcrypt');

const plaintextPassword = 'Uardian'; // Replace with actual plaintext password
const saltRounds = 10;

bcrypt.hash(plaintextPassword, saltRounds, (err, hashedPassword) => {
  if (err) {
    console.error('Error hashing password:', err);
    return;
  }

  console.log('Hashed password:', hashedPassword);
});
