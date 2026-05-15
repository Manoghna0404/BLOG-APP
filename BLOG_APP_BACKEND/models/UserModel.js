import {model,Schema} from 'mongoose';
 
const userSchema=new Schema({
    firstName:{
        type:String,
        required:[true,"First name is required"]
    },
    lastName:{
        type:String,
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    profileImageUrl:{
        type:String,
    },
    role:{
        type:String,
        enum:["AUTHOR","USER","ADMIN"],
        required:[true,"{Value} is an Invalid role"]
    },
    isActive:{
        type:Boolean,
        default:true
    }
},
{
    strict:"throw",
    timestamps:true,
    versionKey:false
})

export const UserTypeModel=model("user",userSchema)