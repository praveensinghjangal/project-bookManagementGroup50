const express = require('express')
const router = express.Router();
<<<<<<< HEAD
const userController=require('../controller/userController')
const bookController=require('../controller/bookController')
const mw=require('../middlewares/auth')
const reviewController=require('../controller/reviewController')

=======
const UserController=require('../controller/userController')
const BookController=require('../controller/bookController')
const ReviewModel=require('../controller/reviewController')
const Middleware=require('../middlewares/auth')
// test
>>>>>>> 5e6f69afe6ad2d354496b3eec108e1ceaf00d2dd
router.get("/test",function(req,res){
    res.send("My first api for checking the terminal")
})

<<<<<<< HEAD

router.post('/register',userController.createUser)
router.post('/login',userController.loginUser)
=======
// user 
router.post('/register',UserController.createUser)
router.post('/login',UserController.loginUser)
// book
router.post('/books',Middleware.authenticate,BookController.createBook)
router.get('/books',Middleware.authenticate,BookController.getBooks)
router.get('/books/:bookId',Middleware.authenticate,BookController.getbookparam)
router.put('/books/:bookId',Middleware.authenticate,Middleware.authorise,BookController.updateBooksById)
router.delete('/books/:bookId',Middleware.authenticate,Middleware.authorise,BookController.deleteBooksById)
// review
router.post('/books/:bookId/review',ReviewModel.createReview)
router.put('/books/:bookId/review/:reviewId',ReviewModel.updateReview)
router.delete('/books/:bookId/review/:reviewId',ReviewModel.deleteReview)

router.all("/**", function (req, res) {
    res.status(404).send({
        status: false,
        msg: "The api you request is not available"
    })
})
>>>>>>> 5e6f69afe6ad2d354496b3eec108e1ceaf00d2dd


router.post('/books',mw.authenticated, bookController.createBook)
router.get('/books',mw.authenticated,bookController.getBooks)
router.get('/books/:bookId',bookController.getbookparam)
router.put('/books/:bookId', bookController.updateBooksById)
router.delete('/books/:bookId',mw.authenticated, bookController.deleteBooksById)




router.post('/books/:bookId/review',reviewController.createReview)
router.put('/books/:bookId/review/:reviewId',reviewController.updateReview)
router.delete('/books/:bookId/review/:reviewId',reviewController.reviewdelete)


router.all("/**", function (req, res) {
    res.status(400).send({
        status: false,
        msg: "Make Sure Your Endpoint is Correct or Not!"
    })
})

module.exports=router;
