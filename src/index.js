const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route');
const {default:mongoose}=require ('mongoose');
const app = express();
//const multer = require('multer')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
<<<<<<< HEAD

//app.use(multer().any())
=======
app.use(express.json())
>>>>>>> 5e6f69afe6ad2d354496b3eec108e1ceaf00d2dd
mongoose.connect("mongodb+srv://Prashant10:Cv4uY0uU1ijKMVpu@cluster0.j9jd1jo.mongodb.net/group50Database-DB?retryWrites=true&w=majority",{
    useNewUrlParser :true
})

.then( () => console.log("MongoDb is Connected"))
.catch( err => console.log(err))

app.use('/',route);

app.listen(process.env.PORT || 3000 ,function(){
    console.log('Express app running on port' + (process.env.PORT || 3000 ))
});