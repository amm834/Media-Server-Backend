const bcrypt = require('bcrypt');

let makeHash = (plainTextPasswd)=> {
 return new Promise((resolve, reject)=> {
  bcrypt.genSalt(10, function(err, salt) {
   bcrypt.hash(plainTextPasswd, salt, function(err, hash) {
    if (err) reject(err);
    resolve(hash);
   });
  });
 });
};

let checkPasswd = (plainTextPasswd, hashPasswd)=> {
 return new Promise((reject, resolve)=> {
  // Load hash from your password DB.
  bcrypt.compare(plainTextPasswd, hashPasswd, function(err,
   result) {
   if(err) reject(err);
   resolve(result);
  });
 });
};

module.exports = {
 makeHash,
 checkPasswd
};