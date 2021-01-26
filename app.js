//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");

const homeStartingContent = "This is where all the posts will be displayed. There is no database so all the posts here must be composed using the /compose page. All the posts are shortened into 100 characters, each generated and truncated dynamically without hardcoding. This way, it saves time generating each posts' site. Packages used are express, body-parser, lodash, ejs. Most of the themes are from bootstrap and AppBrewery.";
const aboutContent = "This is where the description of the page should be. But here have some random jumbo of words instead: Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Read this out to summon my customer service demon: Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
const posts=[];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));




app.get("/",function(req,res){
  const items=[];
  const maxlength=100;
  posts.forEach(function(post){

    const item={
      title:post["title"],
      body:post["body"],
      link:"/posts/"+lodash.lowerCase(post["title"])};

    if (item.body.length>maxlength){
      item.body=item.body.substring(0,maxlength)+"...";
    };
    console.log(item.body);


    items.push(item);
  });

  res.render("home",{
    content1:homeStartingContent,
    post:items
    // content2:aboutContent,
    // content3:contactContent
  })
})

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

  const post={
    title:req.body.postTitle,
    body:req.body.postValue
  };
  posts.push(post);

  // console.log(posts);
  res.redirect("/");
})

app.get("/posts/:postName", function(req,res){
  const postName=lodash.lowerCase(req.params.postName);


  posts.forEach(function(post){
    console.log("url:"+postName+",title:"+lodash.lowerCase(post.title));
    if (postName===lodash.lowerCase(post.title)){
      console.log("Match found!")
      res.render("post",{
        post:post
      })
    } else {
      console.log("Not a match!")
    }
  })

  // res.render("post",{
  //   postName:req.params.postName
  // })
})


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
