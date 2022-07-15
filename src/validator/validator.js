const validator = require('validator')
const mongoose = require('mongoose')
<<<<<<< HEAD
//const passwordValidator = require('password-validator');
=======
const passwordValidator = require('password-validator');
>>>>>>> 5e6f69afe6ad2d354496b3eec108e1ceaf00d2dd
const ObjectId = mongoose.Types.ObjectId;


const isvalidRequestBody = function (value) {
    return Object.keys(value).length > 0
}   
const isValidBody = function (value) {
    if (typeof value === 'undefined' || value === 'null') return false
<<<<<<< HEAD
    if (typeof value === 'string' && value.trim().length === 0) return false   
=======
    if (typeof value === 'string' && value.trim().length === 0) return false
    if (typeof value === 'number' && value.toString().trim().length === 0) return false
>>>>>>> 5e6f69afe6ad2d354496b3eec108e1ceaf00d2dd
    return true
}
const isValidMobileNumber = function (mobile) {
    let checkMobile = /^(\+\d{1,3}[- ]?)?\d{10}$/
    if (checkMobile.test(mobile)) {
        return true;
    }
    return false;
}
const isValidEmail = function (email) {
    let checkemail = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/
    if (checkemail.test(email)) {
        return true;
    }
    return false;
}
const isValidObjectId = function (userId) {
<<<<<<< HEAD
    return mongoose.isValidObjectId(userId)
=======
    return mongoose.Types.ObjectId.isValid(userId)
>>>>>>> 5e6f69afe6ad2d354496b3eec108e1ceaf00d2dd
}

const isValidpassword = function (password) {

    let checkPassword = /^[a-zA-Z0-9!@#$%^&*]{8,15}$/
    if (checkPassword.test(password)) {
        return true
    }
    return false
}
<<<<<<< HEAD
const isValidISBN =function(ISBN){
    let checkISBN= /^(?=(?:\D*\d){13}(?:(?:\D*\d){3})?$)[\d-]+$/
    if(checkISBN.test(ISBN)){
=======
const isValidISBN = function (ISBN) {
    let checkISBN = /^(?=(?:\D*\d){13}(?:(?:\D*\d){3})?$)[\d-]+$/
    if (checkISBN.test(ISBN)) {
        return true
    }
    return false
}

const isValidDate=function(date){

    let checkDate=/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/
    if(checkDate.test(date)){
>>>>>>> 5e6f69afe6ad2d354496b3eec108e1ceaf00d2dd
        return true
    }
    return false
}

module.exports = {
    isvalidRequestBody,
    isValidBody,
    isValidMobileNumber,
    isValidEmail,
    isValidObjectId,
    isValidpassword,
<<<<<<< HEAD
    isValidISBN
}

// .has().uppercase().has().lowercase().has().digits(2).has().not().spaces().is().not().oneOf(['Passw0rd', 'Password123', 'mypassword']
=======
    isValidISBN,
    isValidDate
}


>>>>>>> 5e6f69afe6ad2d354496b3eec108e1ceaf00d2dd
