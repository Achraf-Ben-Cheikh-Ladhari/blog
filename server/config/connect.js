const mongoose=require('mongoose');
const config=require('./config');
mongoose.connect(process.env.DATABASE_URL)
.then(()=>{
    console.log('connected to database!');
}).catch((err)=>{
    console.log(err);
})
module.exports=mongoose;