const User=require('../models/User')
const Role=require('../models/Role')
const bcrypt =require('bcryptjs')
const {validationResult} =require('express-validator')

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

        }catch(e){
            
console.log(e)
res.status(400).json({message:`Login Error`})
     
        }

    }
    async getUsers(req,res){
        try{

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