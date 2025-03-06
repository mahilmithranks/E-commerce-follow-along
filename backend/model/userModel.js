let mongoose = require("mongoose")

const addressSchema=mongoose.Schema({
    country:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    district:{
        type:String,
        required:true

    },
    pincode:{
        type:Number,
        required:true
    },
    area:{
        type:String
    }

})


const userSchema =mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"user",
        enum:["user","seller","admin"]
    },
    address:{
        type:addressSchema,
        required: false
    },
    isActivated:{
        type:Boolean,
        default:true // Changed to true for testing
    }

},{
    timestamps: true
})


const UserModel =mongoose.model("user",userSchema)

module.exports=UserModel