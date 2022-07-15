const mongoose= require('mongoose')
const ObjectId= mongoose.Schema.Types.ObjectId
const moment = require('moment')

const bookSchema=new mongoose.Schema({
    title:{
        type:String,
        required:'Please enter book titile',
        unique:true,
        trim:true
    },

    // bookUrl:{
    //     type: String,
        
    // },
    excerpt:{
        type:String,
        required:'Please enter the excerpt',
        trim:true
    },
    userId:{
        type:ObjectId,
        ref:'User',
        required:true
    
    },
    ISBN:{
        type:String,
        required:'Please enter the ISBN',
        unique:true,
        trim:true
    },
    category:{
        type:String,
        required:'Please enter the category',
        trim:true
    },
    subcategory:{
        type:[String],
        required:'Please enter the category',
        trim:true
    },
    reviews:{
        type:Number,
        default:0,
    },
    deletedAT:{
        type:Date,
        default:null
    },
    isDeleted:{
        type:Boolean,
        default:false
    },

    releasedAt:{
        type: Date,
        required:true,
        default: moment(new Date(), "YYYY/MM/DD"),


        // pattern: "^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$"
    }

},{timestamps:true});

module.exports=new mongoose.model('Book',bookSchema)