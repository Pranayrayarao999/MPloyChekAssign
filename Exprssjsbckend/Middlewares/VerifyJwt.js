const jwt = require('jsonwebtoken');
require('dotenv').config();

//In middlewares we require next, because if this satisfy only it will takes you to next step or it will not.
// const verifyToken = (req,res, next) => {
//     //This checks accesstoken and verifys
//     const token = req.headers['access-token'];
//     if(!token){
//         return res.send('Access Denied');
//     }

//     //const SECRET_KEY ='asdasdfasdasd';
//     try{
//         const verify = jwt.verify(token, process.env.SECRET_KEY);
//         req.user = verify;
//         //after completing verify it will takes you to next
//         next();
//     }
//     catch(err){
//         res.status(401).send("Invalid Access Token");
//         console.log(err);
//     }
// }

// module.exports = verifyToken;