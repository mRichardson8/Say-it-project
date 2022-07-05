const fs = require("fs");

class Blog {
    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.post = data.post;
        this.image = data.image;
        this.reaction = data.reaction;
        this.reply = data.reply;

    }

    static get all(){
        let blogs; 
        try {
            const jsonString = fs.readFileSync("../data.json", "utf8"); //need to change this back to one dot
        
            const blog = JSON.parse(jsonString);
              
            blogs = blog.posts.map((newBlog) => new Blog(newBlog)); 
                   
            console.log(blogs);
            return blogs;

            } catch (err) {
                console.log(err);
            }  
    }

    static create(funny){
        //First of all JSON fle cannot be completely empty, you need to make sure
        //it has atleast a pair of double curly braces "{}". Otherwise you will
        //get an error.

        //first we need to read the json file to see if there are any blogs
        fs.readFile("../data.json", "utf8", (err, jsonString) => {
         if(err) {
             console.log("Error reading file from data.json: ", err);
             return
         }
         try {
             const blog = JSON.parse(jsonString);
             if(Object.entries(blog).length === 0) {
                 const newBlogId = Object.entries(blog.posts).length + 1;
                 const newBlog = new Blog({id: newBlogId, ...funny});  //first we create the new blog to be added to the json file
 
            
                 blog.posts.push(newBlog);
                 fs.writeFile('../data.json', JSON.stringify(blog, null, 2), err => {
                     if(err) {
                         console.log("Error writing file: ", err)
                     } else {
                         console.log('Successfully wrote file');
                     }
                 })
             }
             else {
                 const newBlogId = Object.entries(blog.posts).length + 1;
                 const newBlog = new Blog({id: newBlogId, ...funny});  //first we create the new blog to be added to the json file
 
        
                 blog.posts.push(newBlog);
                 fs.writeFile('../data.json', JSON.stringify(blog, null, 2), (err) =>{
                     if(err){
                         console.log("Error appending new blog to JSON: ", err);
                     } else {
                         console.log("\nFile contents of file after append: ", 
                         fs.readFileSync("../data.json", "utf8"));
                     }
                 } )
                 
             }
         } catch (err) {
             console.log("Error parsing JSON string: ", err);
         }
        }
        
        );
 
     }

     static getBlogById(blogId) {
        let blogs; 
        try {
            const jsonString = fs.readFileSync("../data.json", "utf8"); // remember to remove one of the dots when you link to the endpoint
        
            const blog = JSON.parse(jsonString);
              
            blogs = blog.posts.map((newBlog) => new Blog(newBlog)); 
                   
            for(let i=0;i<blogs.length;i++){
                if(blogs[i].id === blogId) {
                    console.log(blogs[i]);
                    return blogs[i];
                }
            }

            } catch (err) {
                console.log(err);
            }  
    }

    static addComment(blogId, reply){ 
        try {
            const jsonString = fs.readFileSync("../data.json", "utf8"); //need to change this back to one dot
        
            const blog = JSON.parse(jsonString);
            blog.posts[blogId-1].reply.push(reply)
            fs.writeFile('../data.json', JSON.stringify(blog, null, 2), (err) =>{
                if(err){
                    console.log("Error appending new blog to JSON: ", err);
                } else {
                    console.log("\nFile contents of file after append: ", 
                    fs.readFileSync("../data.json", "utf8"));
                }
            } )

            } catch (err) {
                console.log(err);
            }  
    }
        
        // const selectedBlog = Blog.getBlogById(blogId);
        // const repliesList = selectedBlog.reply;
        // repliesList.push(reply);
        // console.log(selectedBlog);
        
        
        
        

        // fs.writeFile('../data.json', JSON.stringify(selectedBlog, null, 2), (err) =>{
        //     if(err){
        //         console.log("Error adding comment to JSON: ", err);
        //     } else {
        //         console.log("\nFile contents of file after append: ", 
        //         fs.readFileSync("../data.json", "utf8"));
        //     }
        // } )

        // return selectedBlog;
    }

     



// {
//     "posts": [
//       {
//         "id": 1,
//         "title": "this is my stuff",
//         "post": "stuff",
//         "image": "",
//         "reaction": [],
//         "reply": [
//           "i like your stuff",
//           "your stuff sucks"
//         ]
//       },
//       {
//         "id": 2,
//         "title": "My love for chicken wings",
//         "post": "I like chicken wings",
//         "image": "",
//         "reaction": [
//           0,
//           0,
//           0
//         ],
//         "reply": []
//       },
//       {
//         "id": 3,
//         "title": "My love for chicken wings",
//         "post": "I like chicken wings",
//         "image": "",
//         "reaction": [
//           0,
//           0,
//           0
//         ],
//         "reply": []
//       }
//     ]
//   }



module.exports = Blog;