var hasher = require("./hashpass/index");

hasher.makeHash('123')
.then(hash=>hasher.checkPasswd('123',hash))
.then(result=>console.log(result))
.catch(err=>console.log(err));