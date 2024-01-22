const express=require('express');
const articleApi=require('./routes/article');
const authorApi=require('./routes/author');
const cors=require('cors');
require('./config/connect');
const app=express();
app.use(express.json());
app.use(cors());
app.use('/article',articleApi);
app.use('/author', authorApi);
app.use('/getimage',express.static('./upload'));
app.listen(process.env.PORT,()=>{
    console.log('server working !'+process.env.PORT)
})