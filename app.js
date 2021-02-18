//jshint esversion:6
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");
const mongoose = require("mongoose");

const homeStartingContent = "This is where all the posts will be displayed. All the posts are created by all the users who had accessed the website. All the posts are shortened into 100 characters, each generated and truncated dynamically without hardcoding. This way, it saves time generating each posts' site. Packages used are express, body-parser, lodash, ejs. Most of the themes are from bootstrap and AppBrewery.";
const aboutContent = "This is where the description of the page should be. But here have some random jumbo of words instead: Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Read this out to summon my customer service demon: Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
const posts=[];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const user=process.env.USR;
const pass=process.env.Password;
mongoose.connect("mongodb+srv://"+user+":"+pass+"@cluster0.yyw0c.mongodb.net/todolistDB?retryWrites=true&w=majority",{ useNewUrlParser: true , useUnifiedTopology: true } );
const blogSchema={
  title: String,
  content: String
};

const Blog=mongoose.model("Blogpost", blogSchema);

app.get("/",function(req,res){
  Blog.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});

app.get("/about",function(req,res){
  res.render("about",{
    // content1:homeStartingContent,
    content2:aboutContent
    // content3:contactContent
  })
})

app.get("/contact",function(req,res){
  res.render("contact",{
    // content1:homeStartingContent,
    // content2:aboutContent
    content3:contactContent
  })
})

app.get("/compose",function(req,res){
  // console.log("hello")
  res.render("compose")

})

app.post("/compose",function(req,res){

  const blogpost= new Blog({
    title:req.body.postTitle,
    content:req.body.postValue
  });
  blogpost.save(function(err){
    if (!err){
      res.redirect("/");
    }
  });
})

app.get("/posts/:post_id", function(req,res){
  const post_id=req.params.post_id;

  Blog.find({}, function(err, posts){
    posts.forEach(function(post){
      const test=post._id;
      // console.log("id post:"+"'"+test+"'"+" type:"+(typeof JSON.stringify(test)));
      // console.log("id link:"+"'"+post_id+"'"+" type:"+(typeof post_id));
      // console.log("isit?"+post_id.localeCompare(test));

    });
  });




  Blog.findOne({_id:post_id}, function(err, posts){
    // console.log("found a match!");
    // console.log("type:"+typeof posts);
    // console.log("content:"+posts.content);
    res.render("post", {
      startingContent: homeStartingContent,
      post: posts
      });
  });



  // posts.forEach(function(post){
  //   console.log("url:"+postName+",id:"+lodash.lowerCase(post.title));
  //   if (post_id===lodash.lowerCase(post._id)){
  //     console.log("Match found!")
  //     res.render("post",{
  //       post:post
  //     })
  //   } else {
  //     console.log("Not a match!")
  //   }
  // })

  // res.render("post",{
  //   postName:req.params.postName
  // })
})


app.listen(process.env.PORT || 3000, function() {
  console.log("Server started");
});
