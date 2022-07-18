const BookModel = require('../models/bookModel')
const UserModel = require('../models/userModel')
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


