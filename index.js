const express=require("express");
const app=express();
let port =8080;
const path=require("path");
app.use(express.urlencoded({extended:true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
const { v4: uuidv4 } = require('uuid'); 
const methodOverride= require("method-override");
app.use(methodOverride("_method"));
let posts=[{id:uuidv4(),username:"Alexander Pope",content:"To err is human; to forgive, divine."},{id:uuidv4(),username:"William Shakespeare",content:"To be or not to be, that is the question."},{id:uuidv4(),username:"Martin Luther King Jr.",content:"I have a dream"}];
app.get("/",(req,res)=>{
    res.render("index.ejs",{posts});
});
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    console.log(id);
    let post=posts.find((p)=>id===p.id);
    res.render("show.ejs",{post});
});
app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    res.redirect("/");
});
app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newContent=req.body.content;
    let post=posts.find((p)=>id===p.id);
    post.content=newContent;
    console.log(post);
    res.redirect("/");

});
app.get("/posts/:id/edit",(req,res)=>{
    let {id} =req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
});
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=>id!==p.id);
    res.redirect("/");
})
app.listen(port,()=>{
    console.log(`listening on port:${port}`);
});