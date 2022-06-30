const{Schema,model}=require('mongoose')

const Role=new Schema({
    value : {type:String,uniqure:true,default:"USER"},
 

})
module.exports=model('Role',Role)