var express = require('express');
var path = require('path');
var model = require('./models/user')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/',(req,res,next)=>{
    res.render('index')
})
app.post('/create',async (req,res)=>{
  const {name,email,image} = req.body
  const createuser = await model.create({
    name,
    email,
    image
  })
  res.redirect("/")
})
app.get('/read',async (req,res)=>{
  let users = await model.find()
  res.render("read",{users})
})
app.get("/delete/:id", async (req, res)=>{
    let deleted = await model.findOneAndDelete({_id:req.params.id})
    res.redirect('/read')
})
app.post("/update/:id",async (req,res)=>{
     let {name,email,image} = req.body
     let updatethis = await model.findOneAndUpdate({_id:req.params.id},{name,email,image},{new:true})
     res.redirect('/read')      
    })
app.get('/edit/:id',async (req,res)=>{
  let user = await model.findOne({_id:req.params.id})
  res.render("edit",{user})
})
app.listen(3000)
module.exports = app;
