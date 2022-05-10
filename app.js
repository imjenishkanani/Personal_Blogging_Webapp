//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "";
const aboutContent = "Hii there, my name is JENISH and i'm from Surat, Gujarat. i done my BCA and currently pursuing MCA at Bangalore Institute of Technology (BIT), Bangalore. i'm a self-learner who love to coding and designing web that people's love. i currenty exploring about API's and new technologies.";
const contactContent = "";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req, res) {
  // all .ejs file in view folder are mandatory.
  // render mathod find -> startingContent key -> in home.ejs file in view folder.
  // and display it's value content.
  res.render("home", {
    // key : value
    startingContent: homeStartingContent,
    posts: posts
  });
});

app.get("/about", function(req, res) {
  res.render("about", {
    about: aboutContent
  });
});

app.get("/contact", function(req, res) {
  res.render("contact", {
    contact: contactContent
  });
})

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.post("/compose", function(req, res) {
  const post = {
    title: req.body.postTitle, // postTitle is name of the field title which we are requested
    content: req.body.postBody // postBody is name of the field content which we are requested.
  };

  // push in posts array that contains our all posts.
  posts.push(post);

  res.redirect("/");
});

app.get("/posts/:postName", function(req, res) {
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post) {
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    } else {
      console.log("Not Match");
    }
  });

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
