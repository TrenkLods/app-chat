const Router=require('express')
const router=new Router()
const controller=require('./authController')
const {check}=require('express-validator')
const authMiddleware =require('../middlewaree/autchMiddleware')
const roleMiddleware =require('../middlewaree/roleMiddleware')

router.post('/registration',[
    check('username',"Имя не может быть пустым").notEmpty(),
    check('password',"Пароль не подходит по длине (4-10 символов)").isLength({min:4,max:10})
], controller.registration)
router.post('/login',controller.login)

router.get('/users', roleMiddleware(['ADMIN']), controller.getUsers)
module.exports=router

