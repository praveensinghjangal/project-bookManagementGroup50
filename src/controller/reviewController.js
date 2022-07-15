const BookModel = require('../models/bookModel')
const UserModel = require('../models/userModel')
<<<<<<< HEAD
//const reviewController = require('../controller/reviewController')
const Validator = require('../validator/validator')
const reviewModel = require('../models/reviewModel')

// const mongoose = require('mongoose')


const createReview = async function (req, res) {
  try {
    let data = req.body
    let idParams = req.params.bookId
    let { review, rating, reviewedBy } = data
    if (!Validator.isvalidRequestBody(data)) { return res.status(400).send({ status: false, msg: 'Please enter the data ' }) }

    if (!idParams) return res.status(400).send({ status: false, message: "please enter the bookId" })
    if (!Validator.isValidObjectId(idParams)) { return res.status(400).send({ status: false, msg: 'Please enter valid bookId' }) }
    data.bookId = idParams



    if (!Validator.isValidBody(rating)) { return res.status(400).send({ status: false, msg: 'Please enter the rating ' }) }

    if (rating < 1 || rating > 5) {
      return res.status(400).send({
        status: false,
        message: "Rating must be 1 to 5",
      });
    }

    if (!Validator.isValidBody(reviewedBy)) { return res.status(400).send({ status: false, msg: 'Please enter the reviewer Name' }) }

    if (!Validator.isValidBody(review)) { return res.status(400).send({ status: false, msg: 'Please enter the review' }) }

    let bookexist = await BookModel.findOneAndUpdate({ _id: idParams, isDeleted: false }, { $inc: { reviews: +1 } }, { new: true })
    console.log(bookexist)
    if (!bookexist) { return res.status(400).send({ status: false, msg: 'No such Book is available' }) }

    const createReview = await reviewModel.create(data)
    res.status(201).send({ status: true, msg: "Success", data: createReview })

  }
  catch (err) {
    res.status(500).send({
      status: false,
      msg: err.message
    })
  }

}




const updateReview = async function (req, res) {
  try {
    let data = req.body
    let idParams = req.params.bookId
    let reviewId = req.params.reviewId
    let { review, rating, reviewedBy } = data

    if (!Validator.isvalidRequestBody(data)) { return res.status(400).send({ status: false, msg: 'Please enter the data ' }) }

    if (!idParams) return res.status(400).send({ status: false, message: "please enter the bookId" })
    if (!Validator.isValidObjectId(idParams)) { return res.status(400).send({ status: false, msg: 'Please enter valid bookId' }) }
    //data.bookId = idParams



    if (!reviewId) return res.status(400).send({ status: false, message: "please enter the reviewId" })
    if (!Validator.isValidObjectId(reviewId)) { return res.status(400).send({ status: false, msg: 'Please enter valid bookId' }) }
    //data.reviewId = reviewId


    if (!Validator.isValidBody(reviewedBy)) { return res.status(400).send({ status: false, msg: 'Please enter the reviewedBy ' }) }

    if (!Validator.isValidBody(rating)) { return res.status(400).send({ status: false, msg: 'Please enter the rating ' }) }

    if (rating < 1 || rating > 5) {
      return res.status(400).send({
        status: false,
        message: "Rating must be 1 to 5",
      });
    }
    if (!Validator.isValidBody(review)) { return res.status(400).send({ status: false, msg: 'Please enter the review' }) }



    let findBook = await BookModel.findOne({ _id: idParams, isDeleted: false })
    if (!findBook) { return res.status(404).send({ status: false, message: ' book does not exist or Deleted' }) }

    let findreview = await reviewModel.findOne({ _id: reviewId, isDeleted: false })
    if (!findreview) { return res.status(404).send({ status: false, message: ' review does not exist or Deleted' }) }

    if (idParams != findreview.bookId) return res.status(400).send({ status: false, message: " BookiD AND reviewid doesn't matches" })
    const reviewsData = await reviewModel.findOneAndUpdate({ _id: reviewId }, { $set: data }, { new: true })
    const booksReview = findBook.toObject()
    booksReview.reviewData = reviewsData
    return res.status(200).send({ status: true, message: "Success", data: booksReview });


  }


  catch (err) {
    res.status(500).send({
      status: false,
      msg: err.message
    })
  }
}


const reviewdelete = async function (req, res) {
  try {

    let idParams = req.params.bookId
    let reviewId = req.params.reviewId

    if (!idParams) return res.status(400).send({ status: false, message: "please enter the bookId" })

    if (!Validator.isValidObjectId(idParams)) { return res.status(400).send({ status: false, msg: 'Please enter valid bookId' }) }
   



    if (!reviewId) return res.status(400).send({ status: false, message: "please enter the reviewId" })

    if (!Validator.isValidObjectId(reviewId)) { return res.status(400).send({ status: false, msg: 'Please enter valid bookId' }) }

    let findBook = await BookModel.findOne({ _id: idParams, isDeleted: false })
    if (!findBook) { return res.status(404).send({ status: false, message: ' book does not exist or Deleted' }) }

    let findreview = await reviewModel.findOne({ _id: reviewId, isDeleted: false })
    if (!findreview) { return res.status(404).send({ status: false, message: ' review does not exist or Deleted' }) }

    if (idParams !== findreview.bookId.toString()) return res.status(400).send({ status: false, msg: " BookiD AND reviewid doesn't matches" })

    const deleteReview = await reviewModel.findOneAndUpdate({ _id: reviewId, isDeleted: false }, { $set: { isDeleted: true } }, { new: true })
    if (deleteReview) {
      await BookModel.findOneAndUpdate(
        { _id: idParams},
        { $inc: { reviews: -1 } }
      )
    } return res.status(200).send({ status: true, message: "Review is successfully Deleted" })
  }
  catch (err) {
    res.status(500).send({
      status: false,
      msg: err.message
    });

  }
}


module.exports = { createReview, updateReview, reviewdelete }

=======
const Validator = require('../validator/validator')
const ReviewModel = require('../models/reviewModel')

const mongoose = require('mongoose')


const createReview = async function (req, res) {
    try {
        // taking bookid from params
        let bookId = req.params.bookId
        if (!bookId) { return res.status(400).send({ status: false, message: "Please enter bookId" }) }
        
        // to validate the bookId is valid or not 
        if (!Validator.isValidObjectId(bookId)) { return res.status(400).send({ status: false, message: "Please enter valid bookId" }) }
        
        // to check the bookID in database
        let dbcall = await BookModel.findOne({ _id: bookId, isDeleted: false })
        
        // console.log(dbcall)
        if (!dbcall) return res.status(404).send({ status: false, message: "bookId not found" })

        // taking value from request body
        let requestBody = req.body
        
        // to check the request body is present
        if (!Validator.isvalidRequestBody(requestBody)) { return res.status(400).send({ status: false, msg: 'review is empty Please add some values' }) }
        
        // to destructure of requestbody 
        let { reviewedBy, rating, review } = requestBody

        if (!Validator.isValidBody(reviewedBy)) {
            reviewedBy = "Guest";
        }
        
        // to check rating is entered
        if (!rating) { return res.status(400).send({ status: false, message: "Rating is required", }) }
        if (typeof rating !== "number") {
            return res.status(400).send({
                status: false,
                message: "Rating must be number only",
            });
        }
        if (rating < 1 || rating > 5) {
            return res.status(400).send({
                status: false,
                message: "Rating must be 1 to 5",
            });
        }
        let obj = {
            reviewedBy,
            rating,
            review,
            bookId,
            reviewedAt: new Date(),
        };
        const reviewCreate = await ReviewModel.create(obj);

        if (reviewCreate) {
            await BookModel.findOneAndUpdate(
                { _id: bookId },
                { $inc: { reviews: 1 } }
            );
        }
        const sendReview = await ReviewModel.find({ _id: reviewCreate._id })
            .select({
                __v: 0,
                createdAt: 0,
                updatedAt: 0,
                isDeleted: 0,
            });
        res.status(201).send({ status: true, message: "Success", data: sendReview, });
    }
    catch (err) {
        res.status(500).send({
            status: false,
            msg: err.message
        })
    }

}

const updateReview = async function (req, res) {

    try {
        
        // taking bookid from params
        let bookId = req.params.bookId
        if (!bookId) { return res.status(400).send({ status: false, message: "Please enter bookId" }) }
        
        // to validate the bookId is valid or not 
        if (!Validator.isValidObjectId(bookId)) { return res.status(400).send({ status: false, message: "Please enter valid bookId" }) }
        
        // to check the bookID in database
        let findBook = await BookModel.findOne({ _id: bookId, isDeleted: false })
        if (!findBook) return res.status(404).send({ status: false, message: "bookId not found" })
        
        // taking reviewId from params
        let reviewId = req.params.reviewId
        if (!reviewId) { return res.status(400).send({ status: false, message: "Please enter reviewId" }) }
        
        // to validate the reviewId is valid or not 
        if (!Validator.isValidObjectId(reviewId)) { return res.status(400).send({ status: false, message: "Please enter valid reviewId" }) }
        
        // to check the bookID in database
        let findReview = await ReviewModel.findOne({ _id: reviewId, isDeleted: false })
        console.log(findReview)
        if(bookId != findReview.bookId)return res.status(404).send({ status: false, message: "reviewId is not of this Book Id" })
        
        // console.log(dbcall)
        if (!findReview) return res.status(404).send({ status: false, message: "reviewId not found" })

        // taking value from request body
        let requestBody = req.body
        
        // to check the request body is present
        if (!Validator.isvalidRequestBody(requestBody)) { return res.status(400).send({ status: false, msg: 'Please enter the value to update in review' }) }
        
        // to destructure of requestbody 
        let { reviewedBy, rating, review } = requestBody
        
        // to check the reviewer name is entered
        if (!reviewedBy) { return res.status(400).send({ status: false, message: "Please enter your name", }) }
      
        // to check rating is entered
        if (!rating) { return res.status(400).send({ status: false, message: "Rating is required", }) }
        if (typeof rating !== "number") {
            return res.status(400).send({
                status: false,
                message: "Rating must be number only",
            });
        }
        if (rating < 1 || rating > 5) {
            return res.status(400).send({
                status: false,
                message: "Rating must be 1 to 5",
            });
        }

        const reviewUpdate = await ReviewModel.findOneAndUpdate(
            { _id: reviewId, isDeleted: false },
            { $set: { rating: rating, review: review, reviewedBy: reviewedBy } }, { new: true })

        const getBook = await BookModel.findOne({ _id: bookId })

        let updatedReview = {
            "_id": getBook._id,
            "title": getBook.title,
            "excerpt": getBook.excerpt,
            "userId": getBook.userId,
            "category": getBook.category,
            "subcategory": getBook.subcategory,
            "isDeleted": getBook.isDeleted,
            "reviews": getBook.reviews,
            "reviewsData": reviewUpdate
        }
        return res.status(201).send({ status: true, msg: 'Book Status', data: updatedReview })
    }
    catch (err) {
        res.status(500).send({
            status: false,
            msg: err.message
        })
    }
}

const deleteReview = async function (req, res) { 

    try {
         // taking bookid from params
         let bookId = req.params.bookId
         if (!bookId) { return res.status(400).send({ status: false, message: "Please enter bookId" }) }
         
         // to validate the bookId is valid or not 
         if (!Validator.isValidObjectId(bookId)) { return res.status(400).send({ status: false, message: "Please enter valid bookId" }) }
         
         // to check the bookID in database
         let findBook = await BookModel.findOne({ _id: bookId, isDeleted: false })
         if (!findBook) return res.status(404).send({ status: false, message: "bookId not found" })
         
         // taking reviewId from params
         let reviewId = req.params.reviewId
         if (!reviewId) { return res.status(400).send({ status: false, message: "Please enter reviewId" }) }
         
         // to validate the reviewId is valid or not 
         if (!Validator.isValidObjectId(reviewId)) { return res.status(400).send({ status: false, message: "Please enter valid reviewId" }) }
         
         // to check the reviewId in database
         let findReview = await ReviewModel.findOne({ _id: reviewId, isDeleted: false })
         
         // console.log(dbcall)
         if (!findReview) return res.status(404).send({ status: false, message: "reviewId not found" })

        const deleteReview=await ReviewModel.findOneAndUpdate({_id:reviewId},{isDeleted:true,deletedAt:Date.now()})
        if(deleteReview){
            await BookModel.findOneAndUpdate(
                { _id: bookId },
                { $inc: { reviews: -1 } }
            )
        }
        const deletedReview=await ReviewModel.find({
            _id:findReview._id}).select({
                __v: 0,
                createdAt: 0,
                updatedAt: 0,
            })
            res.status(201).send({ status: true, message: "Successfully Deleted", data: deletedReview });
    }
    catch (err) {
        res.status(500).send({
            status: false,
            msg: err.message
        })
    }
}

module.exports = { createReview, updateReview, deleteReview }
>>>>>>> 5e6f69afe6ad2d354496b3eec108e1ceaf00d2dd

