const fs = require("fs");

class Blog {
    constructor(data) {
        this.id = data.id;
        this.title = data.title;
        this.post = data.post;
        this.image = data.image;
        this.reaction = data.reaction;
        this.reply = data.reply;
        this.date = data.date;

    }

    static get all(){
        let blogs; 
        try {
            const jsonString = fs.readFileSync("./data.json", "utf8"); 
        
            const blog = JSON.parse(jsonString);
              
            blogs = blog.posts.map((newBlog) => new Blog(newBlog)); 
                   
            
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
        fs.readFile("./data.json", "utf8", (err, jsonString) => {
         if(err) {
             console.log("Error reading file from data.json: ", err);
             return
         }
         try {
             const blog = JSON.parse(jsonString);
             if(Object.entries(blog).length === 0) {
                 const newBlogId = Object.entries(blog.posts).length + 1;
                 const date = new Date();
                 const newBlog = new Blog({id: newBlogId, date: date, ...funny});  //first we create the new blog to be added to the json file
 
            
                 blog.posts.push(newBlog);
                 fs.writeFile('./data.json', JSON.stringify(blog, null, 2), err => {
                     if(err) {
                         console.log("Error writing file: ", err)
                     } else {
                         console.log('Successfully added blog and wrote to data.json');
                     }
                 })
             }
             else {
                 const newBlogId = Object.entries(blog.posts).length + 1;
                 const date = new Date();
                 const newBlog = new Blog({id: newBlogId, date: date, ...funny});  
 
                 blog.posts.push(newBlog);
                 fs.writeFile('./data.json', JSON.stringify(blog, null, 2), (err) =>{
                     if(err){
                         console.log("Error appending new blog to JSON: ", err);
                     } else {
                        console.log("Successfully added blog and appended to data.json");
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
            const jsonString = fs.readFileSync("./data.json", "utf8"); 
        
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
            const jsonString = fs.readFileSync("./data.json", "utf8"); 
        
            const blog = JSON.parse(jsonString);
            blog.posts[blogId-1].reply.push(reply)
            fs.writeFile('./data.json', JSON.stringify(blog, null, 2), (err) =>{
                if(err){
                    console.log("Error adding new reply to data.json: ", err);
                } else {
                    console.log("Reply successfully added to data.json:", 
                    fs.readFileSync("./data.json", "utf8"));
                }
            } )

            } catch (err) {
                console.log(err);
            }  
    }
    
    static addReaction(blogId, index) {
        try{
            const jsonString = fs.readFileSync("./data.json", "utf8");
            const blog = JSON.parse(jsonString);
            const reactionArray = blog.posts[blogId-1].reaction;
            for(let i=0;i<reactionArray.length;i++){
            if(index === i){
                const reactionValue = reactionArray[i];
                const newReactionValue = reactionValue + 1;
                reactionArray[i] = newReactionValue;
                fs.writeFile('./data.json', JSON.stringify(blog, null, 2), (err) =>{
                    if(err){
                        console.log("Error adding new reaction to data.json: ", err);
                    } else {
                        console.log("Reaction successfully added to data.json: ", 
                        fs.readFileSync("./data.json", "utf8"));
                    }
                } )
            }

            }
            

        } catch (err){
            console.log(err)
        }
    }
       
       
    }



module.exports = Blog;
