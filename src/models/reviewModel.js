const mongoose=require('mongoose')
const ObjectId=mongoose.Schema.Types.ObjectId
const moment = require('moment')


const reviewSchema=new mongoose.Schema({
    bookId:{
        type:ObjectId,
        ref:'Book',
        required:'Please enter book id '
    },
    reviewedBy:{
        type:String,
        required:'Please enter the reviwer name ',
        default:'Guest',
        value:{
            type:String,
        },
        trim:true
    },
    reviewedAt:{
        type:Date,
        required:true,
        default: moment(new Date(), "YYYY/MM/DD")
    },
    rating:{
        type:Number,
        min:1,
        max:5,
        required:true,
        
    },
    review:{
        type:String,
        trim:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true});

module.exports=new mongoose.model('Review',reviewSchema)