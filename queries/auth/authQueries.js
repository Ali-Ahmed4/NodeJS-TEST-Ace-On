const userModel = require("../../models/users.js")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const AsyncHandler = require("express-async-handler")
const { redisClient } = require("../../middlewares/blockIP.js")


const signup = async (req, res) => {

    try {

        const checkIfExists = await userModel.findOne({email: req.body.email}) 
        
        if(checkIfExists)
        {
            res.status(400)
            throw new Error("User already Exists")   
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10); 

        const createUser = await userModel.create({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword 
        });

        return res.status(200).json({
            message: "User created Successfully",
            data: createUser
        })
    
    }
    catch(error)
    {
        console.log(error)
    }
}



const login = async (req, res) => {

    try {
        
        const user = await userModel.findOne({ email: req.body.email });

        if (user && (await bcrypt.compare(req.body.password, user.password))) /* if user exists AND the hashed password matches */ {
            const accessToken = jwt.sign({
                user: {
                    username: user.username,
                    email: user.email,
                    id: user._id
                }
            },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "10m" })                                             /* 10 minute expiry */

            return res.status(200).json({
                message: "Login Successfully", data: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    accessToken: accessToken,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                }
            })
        }
        else {
            return res.status(401).json({
                status: "failed",
                message: "email or password is wrong or the user does not exist"
            });
        }
    
    }
    catch (error) {
        console.log(error)
    }



}


const protectedApi = async (req, res) => {

   return res.status(200).json({
        status: "Success",
        message: "API ran Successfully"
    })
}

const getUsers = async (req, res) => {

    try
    {
        const getCached = await redisClient.get('get_users')

        if(getCached?.length > 0)
        {
            
            return res.status(200).json({
                status: "Success",
                message: "Successfully fetched all users",
                data: JSON.parse(getCached)
            })
        }

        const users = await userModel.find().select('_id username email createdAt updatedAt') ;

        if (users.length > 0)
        {
            await redisClient.set('get_users', JSON.stringify(users), "EX", "400");
            return res.status(200).json({
                status: "Success",
                message: "Successfully fetched all users",
                data: users
            })
        }
        else
        {
            return res.status(200).json({
                status: "Success",
                message: "no user found",
                data: []
            })
        }

    }
    catch (error)
    {
        console.log(error)
    }

   
}



module.exports = {signup, login, protectedApi, getUsers}