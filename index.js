const express=require("express");
const app=express();
app.use(express.json()); // optional but good
const port=process.env.PORT || 5050;
const {v4:uuidv4}=require("uuid");// v4 is the version 4
 //uuidv4();// this function call will gerenate the unique id wherever it will implement.
 const methodOverride=require("method-override");
 app.use(methodOverride("_method"));

const path=require("path");
app.path("view engine","ejs");
app.use(express.urlencoded({extended:true}));
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

app.listen(port,(req,res)=>{
    console.log(`App is running on Port ${port}.`);
});
let posts=[
    {
        id:uuidv4(),
        username:"Bittu Raj",
        content:"I love coding."
    },
    {
        id:uuidv4(),
        username:"Satyam",
        content:"I'm an engineer"
    }
]
app.get("/",(req,res)=>{
    res.send("Server Working Well !!");
})
// to see the posts
app.get("/posts",(req,res)=>{
    // let {username,content}=req.params;
    // console.log(posts);
    res.render("posts.ejs",{posts});
    // res.send("Post server working well !!");
})
// add new posts
app.get("/posts/new",(req,res)=>{
    // res.send("new server working well");
    // console.log("new server is working well in terminal");
    res.render("newPost.ejs");
})
// to add new posts after adding details in newPost 
app.post("/posts",(req,res)=>{
    let {username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    console.log("Post created Successful.");
    res.redirect("/posts");
})
// to view your posts in details
app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    console.log(`Id ${id} working well !!`);
    let post=posts.find((p)=>id===p.id);
    if(post){
        res.render("showPost.ejs",{post})
    } else{
        res.status(404).send("Page not found.");
    }
})
// to update your posts
app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    // console.log(id);
    let newContent=req.body.content;
    let post=posts.find((p)=>id === p.id);
    post.content=newContent;
    console.log("Post edited Successful.");
    console.log(post);
    res.redirect("/posts");
})
// to edit your post
app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>p.id===id);
    res.render("edit.ejs",{post});
})
// to delete the post
app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
     posts=posts.filter((p)=>p.id!==id);
    console.log("Post deleted successful.");
    res.redirect("/posts");
})