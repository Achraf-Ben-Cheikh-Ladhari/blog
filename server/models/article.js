const mongoose=require('mongoose');
const Article=mongoose.model('Article',{
    title:{
        type:String
    },
    idAuthor:{
        type:String
    },
    description:{
        type:String
    },
    date:{
        type:String
    },
    content:{
        type:String
    },
    image:{
        type:String
    },
    tags:{
        type:Array
    }
})
module.exports=Article;