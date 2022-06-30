const {Schema,model}=require('mongoose')

const User=new Schema({
    username:{type:String,uniqure:true,required:true},
    password:{type:String,required:true},
    roles:[{type:String,ref:'Role'}]

})
module.exports=model('User', User)