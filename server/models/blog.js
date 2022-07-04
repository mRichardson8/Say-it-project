const blogData = require('../data');

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

    static create(blog){
        const newBlogId = blogData.length + 1;
        const newBlog = new Blog({id: newBlogId, ...blog});
        blogData.push((newBlog));

        return newBlog;
    }


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