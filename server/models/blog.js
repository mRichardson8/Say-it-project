const blogData = require('../data');

class Blog {
    constructor(data) {
        this.id = data.id;
        this.post = data.post;
        this.reaction = data.reaction;
        this.reply = data.reply;

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