const express=require('express');
const router=express.Router();
const Author=require('../models/author');
const bcrypt=require('bcrypt');
const jWt=require('jsonwebtoken');
const cloudinary=require('cloudinary').v2;
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
router.post('/register',upload.any('image'),(req,res)=>{
    data=req.body;
    let newAuthor=new Author(data);
    newAuthor.image=filename;
    //cryptage
    salt=bcrypt.genSaltSync(10);
    newAuthor.password=bcrypt.hashSync(data.password,salt);
    const result = cloudinary.uploader.upload(req.files[0].path);
    cloudinary.v2.uploader
    .upload(req.files[0].path)
    .then(result=>newAuthor.image=result.secure_url);   
    //newAuthor.image=result.secure_url;
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
module.exports=router;
