const express=require('express');
const router=express.Router();
const Article=require('../models/article');
const cloudinary=require('cloudinary').v2;
const fs = require('fs');
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  });
//Partie image
const multer=require('multer');
filename='';
const mystorage=multer.diskStorage({
    filename:(req,file,redirect)=>{
        let date=Date.now();
        let fl=date+'.'+file.mimetype.split('/')[1];
        redirect(null,fl);
        filename=fl;
    }
})
const upload=multer({storage:mystorage})
////////////////////////////////////////

//Sauvegarde
router.post('/ajout',upload.any('image'),async(req,res)=>{
    let data=req.body;
    let newArticle=new Article(data)
    newArticle.date= new Date();
    newArticle.tags=data.tags.split(',');
    const byteArrayBuffer = fs.readFileSync(req.files[0].path);
    const uploadResult = await new Promise((resolve) => {
    cloudinary.uploader.upload_stream((error, uploadResult) => {
        return resolve(uploadResult);
    }).end(byteArrayBuffer);
    });
    //console.log(uploadResult);
    newAuthor.image=uploadResult;
    newArticle.save()
    .then((saved)=>{
       filename='';
       res.status(200).send(saved);
    })
    .catch(err=>{
        res.status(400).send(err);
    })
})

//get all articles
router.get('/get',(req,res)=>{
    Article.find({}).then((data)=>{
        res.send(data);
    }).catch((err)=>{
        console.log(err);
    });
})
//get article by id
router.get('/get/:id',(req,res)=>{
    id=req.params.id;
    Article.findOne({_id:id}).then((data)=>{
        res.send(data);
    }).catch((err)=>{
        console.log(err);
    });
})
//get article by author id
router.get('/getarticlebyauthor/:id',(req,res)=>{
    id=req.params.id;
    Article.find({idAuthor:id}).then((data)=>{
        res.send(data);
    }).catch((err)=>{
        console.log(err);
    });
})

//update by id 
router.put('/update/:id',upload.any('image'),(req,res)=>{
    id=req.params.id;
    let data=req.body;
    let tags=data.tags.split(',');
    if(filename.length>0){
        data.image=filename;
    }
    Article.findByIdAndUpdate({_id:id},data)
    .then((article)=>{
        filename=''
        res.status(200).send(article);
    }).catch((err)=>{
        console.log(err);
    });

})

//delete article by id
router.delete('/supprimer/:id',(req,res)=>{
    const id=req.params.id;
    if(!id){
        res.status(400).send({
            message:" content is required!"
        });
    }
    Article.deleteOne({_id:id}).then((data)=>{
        if (!data){
            res.status(404).send({message:" Article not Found!"});
        }
        res.status(200).send({message: "Article Succufully deleted"});
    })
})

module.exports=router;