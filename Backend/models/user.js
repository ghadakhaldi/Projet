const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    firstName:{type:String},//required==>express Validator
    lastName:{type:String},
    email:{type:String,lowercase:true,trim:true},
    password:{type:String},
    userPicture:{type:String},
    createdOn:{type:Date,default:Date.now()},
    role:{type:String,enum:["admin","client"],default:"client"}
})

module.exports=User=mongoose.model("user",userSchema)
