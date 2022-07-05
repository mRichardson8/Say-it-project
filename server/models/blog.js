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
            const jsonString = fs.readFileSync("./data.json", "utf8");
        
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

}



module.exports = Blog;