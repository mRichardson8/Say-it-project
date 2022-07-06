const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const Blog = require('./models/blog');
require("dotenv").config();
const axios = require('axios');


const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req,res) => {
    res.send('hello world!');
})
app.post('/blogs', (req, res) => {
    const data = req.body;
    const newBlog = Blog.create(data);
    res.send({message: `${newBlog.title} successfully added`})
})

app.get('/blogs', (req, res) => {
    const blogs = Blog.all;
    res.send(blogs);
})

app.get('/blogs/:id', (req,res) => {
    const blogId = parseInt(req.params.id);
    const numOfBlogs = Blog.all.length;
    
    if(blogId > numOfBlogs || blogId <= 0){
        const err = "Error: This blog doesn't exist."
        res.send(err);
    } else {
        const selectedBlog = Blog.getBlogById(blogId);
        res.send(selectedBlog);
    }
    
})

app.post('/reactions', (req, res) => {
    const blogId = parseInt(req.body.id);
    const index = req.body.index;
    const numOfBlogs = Blog.all.length;
    if(blogId > numOfBlogs || blogId <= 0){
        const err = "Error: This blog doesn't exist."
        res.send(err);
    }  else {
        Blog.addReaction(blogId,index);
        res.send({message: 'Reaction successfully sent.'})
    }

})

app.post('/replies', (req,res) => {
    const blogId = parseInt(req.body.id);
    const reply = req.body.text;
    const numOfBlogs = Blog.all.length;
    
    if(blogId > numOfBlogs || blogId <= 0){
        const err = "Error: This blog doesn't exist."
        res.send(err);
    } else {
        Blog.addComment(blogId,reply);
        res.send({message: 'Reply successfully sent.'})
    }
})

app.get('/gifs', async (req,res)=> {            //trending GIFs
    try{
        const result = await axios.get(`https://api.giphy.com/v1/gifs/trending?api_key=${process.env.GIF_API_KEY}`);
        res.send(result.data);
    } catch(err) {
        res.send(err);
    }
    
})

app.get('/gifs/:search', async (req,res) => {   //searching GIFs
    try{
        const result = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIF_API_KEY}&q=${req.params.search}`);
        res.send(result.data);
    } catch(err) {
        res.send(err);
    }
})


app.listen(port, () => { console.log(`server running on port ${port}`)});


module.exports = app;
