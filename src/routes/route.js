const express = require('express')
const router = express.Router();
const userController=require('../controller/userController')
const bookController=require('../controller/bookController')
const mw=require('../middlewares/auth')
const reviewController=require('../controller/reviewController')

router.get("/test",function(req,res){
    res.send("My first api for checking the terminal")
})


router.post('/register',userController.createUser)
router.post('/login',userController.loginUser)


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
