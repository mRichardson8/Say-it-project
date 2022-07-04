const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.port || 3000;
const blog = require('./data');
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


app.listen(port, () => { console.log(`server running on port ${port}`)});


module.exports = app;