const {User} = require("../MongoDBConnect/User.js");

const express = require('express');
const router = express.Router();

//LOGIN & SIGNUP
const jwt = require('jsonwebtoken');

//TOKEN GENERATION (http://localhost:3000/Api/Token)
//jwt.io
//const SECRET_KEY ='asdasdfasdasd';
require('dotenv').config();

router.get('/Token',(req,res) => {
    //YOU CAN GIVE ANYTHING BUT CODE WILL BE GENERATED BASED ON THIS CHECK ON JWT.IO - SECRETID,SECRETKEY
    const token = jwt.sign({id:452323}, process.env.SECRET_KEY);
    res.send(token);
})

//ACCESING MIDDLEWARE HERE, add these beside api , withOUT acces token access will be denied
//const verifyToken = require('../Middlewares/VerifyJwt.js');

//LOGIN (http://localhost:3000/Api/Login)
router.post('/Login',async (req,res) => {
    
    try{
        //checks whether the user is present or not
        const user = await User.findOne({userId: req.body.userId});
        //res.send(user);

        if(!user) return res.json({msg:"Invalid User"});

        const pass = req.body.password == user.password;
        if(!pass) return res.json({msg:"Wrong Password"});

        const role = req.body.role == user.role;
        if(!role) return res.json({msg:"Wrong Input Role..Check & Try Again"});

        const token1 = jwt.sign({id: user._id}, process.env.SECRET_KEY);
        //res.send(token1)
        res.json({
            body:{
                user: user,
                token : token1
            }
        })
    }
    catch(err){
        console.log(err);
    }

})

//SIGNUP (http://localhost:3000/Api/SignUp)
router.post('/SignUp',async (req,res) => {

    let {userId,password,role} = req.body;
    try{
        //checks whether the user is having same userid or not 
        const user1 = await User.findOne({userId: req.body.userId});
        //res.send(user);
        if(user1) return res.json({msg:"UserId exist..Try new UserId"});
        else{
            let user2 = new User({
                userId: req.body.userId,
                password: req.body.password,
                role : req.body.role
            });

            const save = user2.save()
            res.status(200).send(save);
            console.log("SIGNUP SUCCESSFULL...!!")
            
            //res.send(user2);
            //res.status(200).save(user2);
            // res.save(function(err,resp){
            //     if(err) return res.send(err);
            //     res.send(resp);
            // })
        }
    }
    catch(err){
        res.status(500).send("Internal Server Error..!!");
        console.log(err);
        //res.send(err);
    }
});

//CRUD OPERATIONS
//GENERALUSERS (http://localhost:3000/Api/Users)
//THIS RETRIVES TOTAL DATA OF ROLE=GENERALUSER
router.get('/Users',async(request,response) => {
    
    try{
        const UserData = await User.find({role: "GeneralUser"});
        return response.status(201).send(UserData);
    }
    catch(err){
        console.log(err);
        return response.sendStatus(400);
    }
    //response.send({msg:"Heyy Router"})
})

//ADMIN (http://localhost:3000/Api/Admin)
//GET ,THIS RETRIVES TOTAL DATA FOR ADMIN EVEN ADMIN,GENERALUSERS
router.get('/Admin',async(request,response) => {
    
    try{
        const UserData = await User.find();
        //return response.status(201).send(UserData);
        return response.status(200).send(UserData);
    }
    catch(err){
        console.log(err);
        return response.sendStatus(400);
    }
    //response.send({msg:"Heyy Router"})
})

//DELETE (http://localhost:3000/Api/Delete/:id)
// ONLY ADMIN CAN DELETE THE DATA
//NotWorking
router.delete('/Delete/:id',async(request,response) => {
    try{
        const id = request.params.id;
        const dltedUsr = await User.deleteOne({_id : id});   

        response.status(200).json.send(dltedUsr)({
            success: true,
            message:"USER DELETED SUCCESSFULLY"
        });
    }
    catch(err){
        console.log(err);
        return response.sendStatus(500).send("Internal server error");
    }
})

module.exports = router;