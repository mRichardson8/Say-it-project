//js file to help test methods in blog.js are fully working
const Blog = require('./blog');
const fs = require('fs');


//Blog.create(testBlog);
//  Blog.addReaction(9,1);

const blog = { title: "this is my stuff",
post: "stuff",
image: "",
reaction: [
  2,
  0,
  0
],
reply: [
  "i like your stuff",
  "your stuff sucks",
  "i like eggs",
  "new reply"
]}

Blog.create(blog);





// Blog.addComment(1,"i like eggs");
// Blog.getBlogById(1);