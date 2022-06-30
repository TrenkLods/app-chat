const Router=require('express')
const router=new Router()
const controller=require('./authController')
const {check}=require('express-validator')

router.post('/registration',[
    check('username',"Имя не может быть пустым").notEmpty(),
    check('password',"Пароль не подходит по длине (4-10 символов)").isLength({min:4,max:10})
], controller.registration)
router.post('/login',controller.login)

router.get('/users',controller.getUsers)
module.exports=router

