//password of mongodb atlas--> CpJaTrA8pxqy5jS2
const express=require("express");
const bodyParser=require("body-parser");
const app=express();
const mongoose=require("mongoose");
const date=require(__dirname+"/date.js");
// var item=["do homework","play cricket","watch movies"];
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
// mongoose.connect("mongodb://127.0.0.1:27017/sample",{useNewUrlParser: true});
mongoose.connect("mongodb+srv://shubham:CpJaTrA8pxqy5jS2@cluster0.dwgfoma.mongodb.net/todolist",{useNewUrlParser: true});
const itemschema=new mongoose.Schema({
   name:String
});
const Item=mongoose.model("Item",itemschema);
// const item1=new Item({
//    name:"play cricket"
// });
// const item2=new Item({
//    name:"do homework"
// });
// const item3=new Item({
//    name:"listen music"
// });
// // const arr=["dinner","breakfast"];
// const defaultItems=[item1,item2,item3];
// Item.insertMany(defaultItems);
app.get("/",function(req,res){
   // res.render("index",{kindOfday:"Today",list:arr});
   Item.find()
.then(function (models) {
  res.render("index",{kindofday: date(),list:models});
})
.catch(function (err) {
  console.log(err);
});
});
app.post("/",function(req,res){
   const itemName = req.body.todo;

   const newItem = new Item({
      name: itemName
   });
   newItem.save();
   res.redirect('/');
});
app.post("/delete",function(req,res){
  const id=req.body.checkbox;
  Item.deleteOne({ _id: id}).then(result => {
   console.log(result)
});
 res.redirect("/");
})
app.listen(3000,function(){
   console.log("server has been created at port 3000!");
});
