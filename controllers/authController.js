const User=require('../models/User')
const Role=require('../models/Role')
const bcrypt =require('bcryptjs')
const {validationResult} =require('express-validator')
const jwt =require('jsonwebtoken')
const {secret}=require ("../config")


const generateAccessToken =(id,roles)=>{
    const payload={
        id,roles
    }
    return jwt.sign(payload,secret,{expiresIn:"1h"})
}


class authController{
    async registration(req,res){
        try{
            const errors=validationResult(req)
            if (!errors.isEmpty()){
                return res.status(400).json({message: "error registration, " ,errors})
            }
            const {username,password}=req.body
            const candidate=await User.findOne({username})
            if(candidate){
                return res.status(400).json({message:`This user already exists`})
            }
            const hashPassword=bcrypt.hashSync(password,7)
            const userRole =await Role.findOne({value:"USER"})
            const user=new User({username,password:hashPassword,roles:[userRole.value]})
            await user.save()
            return res.json({message:`User successfully created`})
        }catch(e){
console.log(e)
res.status(400).json({message:`Rehistration Error`})
        }


    }
    async login(req,res){
        try{
            const {username,password}=req.body
            const user=await User.findOne({username})
            if(!user){
                return res.status(400).json({message:`Пользователь ${username} не найден`})
            }
            const validPassword =bcrypt.compareSync(password,user.password)
            if(!validPassword){
                return res.status(400).json({message:`Пароль не верный`})
            }
            const token=generateAccessToken(user._id,user.roles)
            return res.json({token})
        }catch(e){
            
console.log(e)
res.status(400).json({message:`Login Error`})
     
        }

    }
    async getUsers(req,res){
        try{
            const users=await User.find()
            res.json(users)
            /* 
            const userRole=new Role()
            const adminRole=new Role({value:"ADMIN"})
            await userRole.save()
            await adminRole.save()
            */

            res.json(`server-rout work + ${userRole.value} +${adminRole.value} `)
        }catch(e){
            
        }

    }
}
module.exports=new authController()