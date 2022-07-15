const BookModel = require('../models/bookModel')
const UserModel = require('../models/userModel')
const reviewModel = require('../models/reviewModel')
const Validator = require('../validator/validator')
//const aws= require("aws-sdk")
//const moment =require('moment')

// aws.config.update({
//     accessKeyId: "AKIAY3L35MCRVFM24Q7U",
//     secretAccessKey: "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",
//     region: "ap-south-1"
// })

// let uploadFile= async ( file) =>{
//    return new Promise( function(resolve, reject) {
//     // this function will upload file to aws and return the link
//     let s3= new aws.S3({apiVersion: '2006-03-01'}); // we will be using the s3 service of aws

//     var uploadParams= {
//         ACL: "public-read",
//         Bucket: "classroom-training-bucket",  //HERE
//         Key: "abc/" + file.originalname, //HERE 
//         Body: file.buffer
//     }


//     s3.upload( uploadParams, function (err, data ){
//         if(err) {
//             return reject({"error": err})
//         }
//         console.log(data)
//         console.log("file uploaded succesfully")
//         return resolve(data.Location)
//     })

    

//    })
// }

const createBook = async function (req, res) {
    try {

        const requestBody = req.body
        const { userId, title, ISBN, excerpt, category, subcategory, releasedAt } = requestBody
        if (!Validator.isvalidRequestBody(requestBody)) { return res.status(400).send({ status: false, message: 'Please enter the userId ' }) }


        
        const dateRegex=/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/
        // to validate the userid
        if (!Validator.isValidObjectId(userId)) { return res.status(400).send({ status: false, message: 'Please enter valid userId' }) }
        // to find the userid in our database
        const validUserId = await UserModel.findById({ _id: userId })
        if (!validUserId) { return res.status(400).send({ status: false, message: 'This userid does not exist' }) }
        // validation starts
        // to check the title is present  
        if (!Validator.isValidBody(title)) { return res.status(400).send({ status: false, message: 'Please enter the title' }) }
        // to check the titile from database
        const isDuplicatetitle = await BookModel.findOne({ title: title })
        if (isDuplicatetitle) { return res.status(400).send({ status: false, message: 'This book is already present' }) }
        // to check the excerpt is present 
        
        if (!Validator.isValidBody(excerpt)) { return res.status(400).send({ status: false, message: 'Please enter the excerpt' }) }
        // to check the title is present  
        if (!Validator.isValidBody(ISBN)) { return res.status(400).send({ status: false, message: 'Please enter the ISBN' }) }
        // to validate the ISBN
        if(!Validator.isValidISBN(ISBN)){ return res.status(400).send({ status: false, message: 'Please enter valid ISBN' }) }
        // to check the ISBN from database
        const isDuplicateISBN = await BookModel.findOne({ ISBN: ISBN })
        if (isDuplicateISBN) { return res.status(400).send({ status: false, message: 'This book ISBN is already present' }) }
        // to check the category is present  
        if (!Validator.isValidBody(category)) { return res.status(400).send({ status: false, message: 'Please enter the category' }) }
        // to check the subcategory is present  
        if (!Validator.isValidBody(subcategory)) { return res.status(400).send({ status: false, message: 'Please enter the subcategory' }) }
        

        if(!Validator.isValidBody(releasedAt))return res.status(400).send({ status: false, message: "Please provide releasedAt Date " });
        if(!releasedAt.match(dateRegex))return res.status(400).send({ status: false, message: "Please provide releasedAt in correct Date (YYYY-MM-DD)" });


        const findBook = await UserModel.findById({ _id: requestBody.userId })
        console.log(findBook)
        if (!findBook) {
            return res.status(404).send({ status: false, message: "No book find by params" })

        }
        // 
        //Authorization-if the user doesn't created the book, then won't be able to delete it.
        else if (findBook._id != req.dtoken) {
            return res.status(403).send({
                status: false,
                message: "Unauthorized access."
            })
        }
        // let files= req.files
        // if(files && files.length>0){
            
        //     let uploadedFileURL= await uploadFile( files[0] )
        //   requestBody.bookUrl = uploadedFileURL
      
        const createBook= await BookModel.create(requestBody)
        return res.status(201).send({status:true,message:createBook})

        } 
    
         catch (err) {
       return  res.status(500).send({
            status: false,
            message: err.message
        })
    }

}
const getBooks = async function (req, res) {
    try {
        let userId = req.query.userId
        let category = req.query.category
        let subcategory = req.query.subcategory



        let obj = {
            isDeleted: false,
        }
        if (userId) {
            obj.userId = userId
        }
        if (category) {
            obj.category = category
        }
        if (subcategory) {
            obj.subcategory = subcategory
        }
       
        
        
        let allBooks = await BookModel.find(obj).select({ _id: 1, title: 1, excerpt: 1, userId: 1, category: 1, reviews: 1, releasedAt: 1 })
        if (allBooks.length == 0) { return res.status(404).send({ status: false, message: 'No such books find ' }) }

        return res.status(200).send({ status: true, message: 'Book List', data: allBooks })

    } catch (err) {
       return res.status(500).send({
            status: false,
            message: err.message
        })
    }
}


const getbookparam = async function( req, res){

    try{
        let result= req.params.bookId
        console.log(result)

        if(!result){ return res.status(400).send({status: false, message:"Please enter bookId"})}
      
        let dbcall= await BookModel.findOne({_id: result})
        console.log(dbcall)
        if(!dbcall) return res.status(400).send({status: false, message:"bookId not found"})

        let dbcell= await reviewModel.find({bookId: result})
        console.log(dbcell)

        let dcall = 
        {
            "_id": dbcall._id,
            "title": dbcall.title,
            "excerpt":dbcall.excerpt,
            "userId": dbcall.userId,
            "category":dbcall.category,
            "subcategory": dbcall.subcategory,
            "reviews": dbcall.reviews,
            "isDeleted": dbcall.isDeleted,
            "releasedAt": dbcall.releasedAt,
            "createdAt": dbcall.createdAt,
            "updatedAt": dbcall.updatedAt,
            "reviewsData": dbcell
            
        }

        // dbcall["reviewsData"] = dbcell
        return res.status(200).send({status: true, message:" Books list", data:dcall})
       
    } catch (err) {
         return res.status(500).send({
            status: false,
            message: err.message
        })
    }

}

const updateBooksById = async function (req, res) {
    try {
        // taking bookid from params
        let result = req.params.bookId
        if (!result) { return res.status(400).send({ status: false, message: "Please enter bookId" }) }
        // to validate the bookId is valid or not 
        if (!Validator.isValidObjectId(result)) { return res.status(400).send({ status: false, message: "Please enter valid bookId" }) }
        // to check the bookID in database
        let dbcall = await BookModel.findOne({ _id: result, isDeleted: false })
        // console.log(dbcall)
        if (!dbcall) return res.status(404).send({ status: false, message: "bookId not found" })

        // taking value from request body
        let requestBody = req.body
        // to check the request body is present
        if (!Validator.isvalidRequestBody(requestBody)) { return res.status(400).send({ status: false, msg: 'Please enter the value to update' }) }
        // to destructure of requestbody 
        let { title, excerpt, ISBN, releasedAt} = requestBody
        // if Title is present 
        if (title) {
            // to check the title is entered
            if (!Validator.isValidBody(title)) { return res.status(400).send({ status: false, msg: 'Please enter the title' }) }
            // to check the title in database
            let checkTitle = await BookModel.findOne({ title: title })
            if (checkTitle) { return res.status(404).send({ status: false, message: "This Book title name is already present" }) }
        }
        // if ISBN is present 
        if (ISBN) {
            // to check the ISBN is entered
            if (!Validator.isValidBody(ISBN)) { return res.status(400).send({ status: false, msg: 'Please enter the ISBN' }) }
            // to check the valid ISBN
            if (!Validator.isValidISBN(ISBN)) { return res.status(404).send({ status: false, message: "Please enter valid ISBN" }) }
            // to check the ISBN in database
            let checkISBN = await BookModel.findOne({ ISBN: ISBN })
            if (checkISBN) { return res.status(404).send({ status: false, message: "This Book ISBN is already present" }) }
        }
        const findBook = await BookModel.findById({ _id: result })
        if (!findBook) {
            return res.status(404).send({ status: false, message: "No book find by params" })

        }
        // 
        //Authorization-if the user doesn't created the book, then won't be able to delete it.
        else if (findBook.userId != req.dtoken) {
            return res.status(403).send({
                status: false,
                message: "Unauthorized access."
            })
        }




        // to update the book
        let updateBook = await BookModel.findOneAndUpdate({ _id: result }, { $set: { title: title, excerpt: excerpt, ISBN: ISBN, releasedAt: releasedAt } }, { new: true })
        return res.status(200).send({ status: true, message: 'Success', data: updateBook })
    } catch (err) {
        return res.status(500).send({
            status: false,
            message: err.message
        })
    }
}

const deleteBooksById = async function (req, res) {
    try{
        // taking bookid from params
        let result = req.params.bookId
        if (!result) { return res.status(400).send({ status: false, message: "Please enter bookId" }) }
        // to validate the bookId is valid or not 
        if (!Validator.isValidObjectId(result)) { return res.status(400).send({ status: false, message: "Please enter valid bookId" }) }
        // to check the bookID in database
        let dbcall = await BookModel.findOne({ _id: result, isDeleted: false })
        // console.log(dbcall)
        if (!dbcall) return res.status(404).send({ status: false, message: "bookId not found or book is already deleted" })
    
        const findBook = await BookModel.findById({ _id: result })
        if (!findBook) {
            return res.status(404).send({ status: false, message: "No book find by params" })

        }
        // 
        //Authorization-if the user doesn't created the book, then won't be able to delete it.
        else if (findBook.userId != req.dtoken) {
            return res.status(403).send({
                status: false,
                message: "Unauthorized access."
            })
        }


        const deletedBook=await BookModel.findOneAndUpdate({_id:result},{isDeleted:true},{new: true})
        return res.status(200).send({
            status:true,
            message:'Book Deleted successfully',
            data:deletedBook
        })
    
    } catch (err) {
        res.status(500).send({
            status: false,
            message: err.message
        })
    }
    }
    







module.exports = { createBook, getBooks,getbookparam, updateBooksById,deleteBooksById }

// const updateBookById = async function (req, res) {
//     try {
//         const data = req.body
//         let bookId = req.params.bookId
//         const { title, excerpt, ISBN } = data
         
//         let updateQuery= {}
         
//         if(title){
//             updateQuery["title"]= title;

//             const checkTitle = await bookModel.findOne({ title: title })
//             if (checkTitle) {
//                 res.status(400).send({
//                     status: false,
//                     message: "book already present with this title"
//                 })
//             }
//         }

//         if(excerpt){
//             updateQuery["excerpt"]= excerpt
//         }
        
//         if(req.body["release date"]){
//             updateQuery["releasedAt"]= req.body["release date"]
//         }

//         if(req.body["releasedAt"]){
//             updateQuery["releasedAt"]= req.body["releasedAt"]
//         }

//         if(ISBN){
//             updateQuery["ISBN"]= ISBN;

//             const checkISBN = await bookModel.findOne({ ISBN: ISBN })
//             if (checkISBN) {
//                 res.status(400).send({                         
//                     status: false,
//                     message: "book already present with this ISBN"    
//                 })
//             }
//         }

//         console.log(updateQuery)

//         if (Object.keys(data).length == 0) {
//             res.status(400).send({
//                 status: false,
//                 message: "All request body field can't be empty"
//             })
//         }

//         const updateData = await bookModel.findOneAndUpdate({ _id: bookId, isDeleted: false }, updateQuery, { new: true })
//         if(!updateData){
//             return res.status(404).send({
//                 status: false,
//                 message: "book is deleted now you can't update"
//             })
//         }

//         res.status(200).send({ status: true, message: "success", data: updateData })
//         return

//     }
//     catch (err) {
//         console.log(err.message)
//         return res.status(500).send({
//             status: false,
//             message: err.message
//         })
//     }
// }
    
