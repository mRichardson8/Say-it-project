const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.port || 3000;
const Blog = require('./models/blog');


const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req,res) => {
    res.send('hello world!');
})
app.post('/blogs', (req, res) => {
    const data = req.body;
    const newBlog = Blog.create(data);
    res.send({message: `${newBlog.title} successafully added`})
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


app.listen(port, () => { console.log(`server running on port ${port}`)});


module.exports = app;