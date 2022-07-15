const jwt=require('jsonwebtoken')
const mongoose=require('mongoose')

const authenticated =function (req,res,next){

try{
    let token= req.headers['x-api-key']
    if(!token) res.status(400).send({status:false,msg:"Please enter token"})
    
    let validtoken = jwt.verify(token, "Project-3 Book Management ")
    if (!validtoken) return res.status(401).send({ status: false, msg: "Please enter valid Token " })
    req.dtoken= validtoken.userId
}catch (err) {
    res.status(500).send({
        status: false,
        msg: err.message,
    })
}
next()
}




module.exports={authenticated}





// jwt.verify(token, "Project-3 Book Management "), function (error){
//     if(error) return res.status(401).send({status: false, message: "invalid token"})
//     else{
//         next()
//     }
// }
