const blogData = require('../data');
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
        const blogs = blogData.map((blog) => new Blog(blog));
        return blogs; //might need to change this when we start reading and writing from the JSON file but for now this is fine
    }

    static create(funny){
        //first we need to read the json file to see if there are any blogs
        fs.readFile("../data.json", "utf8", (err, jsonString) => {
         if(err) {
             console.log("Error reading file from disk", err);
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

       //First of all JSON fle cannot be completely empty, you need to make sure
//it has atleast a pair of double curly braces "{}". Otherwise you will
//get an error.


       
        
        // blogData.push((newBlog));

        // return newBlog;
    


}


// "id":1
// 	"title":"cars"
// 	"post":"G Wagon is best"
// 	"reaction":":)"
// 	"reply":[
// 	{
// 		"
// 		"rText": "I agree" //reply no.1 post
// 		
// 	},
// 	{
// 		"rId":2 //reply no.2
// 		"rText": "Too expensive" //reply no.2's post
// 		"rReaction": null //no reaction on reply no.2's post
// 	}]

module.exports = Blog;