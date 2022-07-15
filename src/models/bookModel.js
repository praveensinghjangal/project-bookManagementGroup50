const mongoose= require('mongoose')
<<<<<<< HEAD
const ObjectId= mongoose.Schema.Types.ObjectId
const moment = require('moment')
=======
const ObjectId=mongoose.Types.ObjectId
const moment =require('moment')
>>>>>>> 5e6f69afe6ad2d354496b3eec108e1ceaf00d2dd

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
<<<<<<< HEAD
    
=======
>>>>>>> 5e6f69afe6ad2d354496b3eec108e1ceaf00d2dd
    },
    ISBN:{
        type:String,
        required:'Please enter the ISBN',
        unique:true,
        trim:true
    },
    category:{
        type:String,
<<<<<<< HEAD
        required:'Please enter the category',
        trim:true
    },
    subcategory:{
        type:[String],
        required:'Please enter the category',
        trim:true
=======
        required:'Please enter the category'
    },
    subcategory:{
        type:[String],
        required:'Please enter the category'
>>>>>>> 5e6f69afe6ad2d354496b3eec108e1ceaf00d2dd
    },
    reviews:{
        type:Number,
        default:0
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
<<<<<<< HEAD
        default: moment(new Date(), "YYYY/MM/DD"),


        // pattern: "^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$"
=======
        default: moment(new Date(), "YYYY/MM/DD")
>>>>>>> 5e6f69afe6ad2d354496b3eec108e1ceaf00d2dd
    }

},{timestamps:true});

module.exports=new mongoose.model('Book',bookSchema)