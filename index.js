const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const path=require('path');
const bodyParser = require('body-parser');

// Basic Configuration
const port =  8000;

app.use(cors());

app.use(express.static(path.join(__dirname,`/public`)));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname,'views','index.html'));
  // res.status(200).send("HEloo form the server!!");
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.listen(8080 || process.env.PORT, function() {
  console.log(`Listening on port ${port}`);
});
const uri = 'mongodb+srv://saeedomar054:CE1sXb1U3pRJHjJF@cluster0.qmotlx7.mongodb.net/db1?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(uri,{
  useNewUrlParser: true,
  useUnifiedTopology: true
});







const conn = mongoose.connection;
conn.once('open',()=>{
  console.log('Succesfullt connected');
})
conn.on('error',()=>{
  console.log('failed connn');
})
let Result = {};

let urlSchema = new mongoose.Schema({
  original:{type:String,required:true},
  short:Number
})
let Url = mongoose.model('Url',urlSchema)
app.post('/api/shorturl',bodyParser.urlencoded({extended:false}),(request,response)=>{
  let inputUrl = request.body['url']
  let urlRegex = new RegExp( /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi )
  if(!inputUrl.match(urlRegex)){
    response.json({error: 'invalid url'})
    return
  }
  
  Result['original_url'] = inputUrl;



  let inputShort = 1 


   Url.findOne({}).sort({short: 'desc'}).exec((error,result) => {
      if(!error && result != undefined){
        inputShort = result.short + 1
      }
 if(!error){
   Url.findOneAndUpdate(
     {original: inputUrl},
     {original: inputUrl, short: inputShort},
       {new:true,upsert:true},(error,savedUrl)=>
         {
         if(!error){
          Result['short_url']=savedUrl.short
         response.send(`this is your shortURL:https://3000-freecodecam-boilerplate-tdblpfaimpy.ws-us110.gitpod.io/api/shorturl/${savedUrl.short}`)  
         }})
         }
       }
     )
     }    )
//      }
//  )
app.get('/api/shorturl/:input',(request,response)=>{
    let input = request.params.input;
    Url.findOne({short:input},(error, result)=>{
      if(!error && result != undefined){
        response.redirect(result.original)
      }else{
        response.json('url error')
      }
    })
})
  