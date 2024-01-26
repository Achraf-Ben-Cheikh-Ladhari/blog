const express=require('express');
const router=express.Router();
const Author=require('../models/author');
const bcrypt=require('bcrypt');
const jWt=require('jsonwebtoken');
const fs = require('fs');
const cloudinary=require('cloudinary').v2;
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


//creation
router.post('/register',upload.any('image'),async (req,res)=>{
    data=req.body;
    let newAuthor=new Author(data);
    //newAuthor.image=filename;
    //cryptage
    salt=bcrypt.genSaltSync(10);
    newAuthor.password=bcrypt.hashSync(data.password,salt);

    //await


    const byteArrayBuffer = fs.readFileSync(req.files[0].path);
    const uploadResult = await new Promise((resolve) => {
    cloudinary.uploader.upload_stream((error, uploadResult) => {
        return resolve(uploadResult);
    }).end(byteArrayBuffer);
    });
    //console.log(uploadResult);
    newAuthor.image=uploadResult.url;
    //sans await
    //cloudinary.uploader.upload(req.files[0].path).then(result=>{newAuthor.image=result.url;console.log(result.url);console.log(newAuthor.image);});
    newAuthor.save()
    .then((savedAuthor)=>{
        filename='';
        res.status(200).send(savedAuthor);
    })
    .catch(err=>{
        res.send(err);
    })
})

//login

router.post('/login',(req,res)=>{
    data=req.body;
    Author.findOne({email:data.email})
    .then(
        (author)=>{
            let valid=bcrypt.compareSync(data.password,author.password);
            if(!valid){
                res.send('email or password invalid!')
            }else{
                let payload={
                    _id:author.id,
                    email:author.email,
                    fullname:author.name+' '+author.lastname
                }
                let token=jWt.sign(payload,'123456789');
                res.send({mytoken:token})
            }
        }
    )
    .catch(
        err=>{
            res.send(err);
        }
    )
})

//gett all users
router.get('/all',(req,res)=>{
    Author.find({}).then((data)=>{
        res.send(data);
    }).catch((err)=>{
        console.log(err);
    });
})

//get user by id 
router.get('/get/:id',(req,res)=>{
    id=req.params.id;
    Author.findOne({_id:id}).then((data)=>{
        res.send(data);
    }).catch((err)=>{
        console.log(err);
    });
})

//delete author by id
router.delete('/supprimer/:id',(req,res)=>{
    const id=req.params.id;
    if(!id){
        res.status(400).send({
            message:" content is required!"
        });
    }
    Author.deleteOne({_id:id}).then((data)=>{
        if (!data){
            res.status(404).send({message:" User not Found!"});
        }
        res.status(200).send({message: "User Succufully deleted"});
    })
})


//update user
router.put('/update/author/:id',upload.any('image'),async(req,res)=>{
    id=req.params.id;
    let data=req.body;
    if (data.password!=undefined){
        salt=bcrypt.genSaltSync(10);
    data.password=bcrypt.hashSync(data.password,salt);
    }
    
    if(filename.length>0){
        const byteArrayBuffer = fs.readFileSync(req.files[0].path);
        const uploadResult = await new Promise((resolve) => {
        cloudinary.uploader.upload_stream((error, uploadResult) => {
        return resolve(uploadResult);
        }).end(byteArrayBuffer);
        });
        data.image=uploadResult.url;
    }   
    Author.findByIdAndUpdate({_id:id},data)
    .then((author)=>{
        filename=''
        if(data.image == undefined){
            data.image=author.image
            res.status(200).send(author);
        }else{
            res.status(200).send(author);
        }
        //console.log(author.image+ " 3************");
    }).catch((err)=>{
        console.log(err);
    });

})
module.exports=router;
