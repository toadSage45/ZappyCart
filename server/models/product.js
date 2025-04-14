import mongoose from "mongoose";

const  {ObjectId} = mongoose.Schema;

const productSchema = new mongoose.Schema({

    title : {
        type : String , 
        trim : true , 
        required : ['Name is required'],
        minlength : [2 , 'Too short'] , 
        maxlength : [32 , 'Too long'],
        text : true
    },
    slug : {
        type : String ,
        unique : true , 
        lowercase : true , 
        index : true , 
    },
    description : {
        type : String , 
        required : ['Description is required'],
        minlength : [2 , 'Too short'] , 
        maxlength : [2000 , 'Too long'],
        text : true
    },
    price : {
        type : Number ,
        trim : true, 
        required : ['Price is required'],
        minlength : [1 , 'Too short'] , 
        maxlength : [32 , 'Too high'],
        text : true
    },
    category : {
        type : ObjectId , 
        ref : "Category",
    },
    subs : [
       {
        type : ObjectId ,
        ref : "Sub",
       }
    ],
    quantity : Number , 
    sold : {
        type : Number , 
        default : 0
    },
    images : {
        type : Array ,
    },
    shipping : {
        type : String,
        enum : ["Yes" , "No"],
    },
    color : {
        type : String , 
        enum : ["Black" , "Brown" , "Silver" ,"White" ,"Blue"],
    },
    brand : {
        type : String , 
        enum : ["Apple" , "Samsung" , "Lenovo" ,"Microsoft" ,"ASUS"],
    },
    // ratings : [
    //     {
    //         star : Number ,
    //     postedBy : {
    //         type : ObjectId ,
    //         ref : "User"
    //     }
    // }
    // ],
}, {
    timestamps : true
})

export default mongoose.model("Product" , productSchema)