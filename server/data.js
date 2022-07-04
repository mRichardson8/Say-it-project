const blogs = [{id: 1, title: 'dummy post' , post: 'Hello this is my blog post' , image:'' , reaction:[0,0,0] , reply: []},
]  //reactions is an array as we need to allow for multiple reactions to one blog post, same goes for replies
// each index in the reaction array can correlate to a reaction, when a user clicks a reaction you can increase the number in the array by 1 for every reaction
// ie. :) at index 0, 5 users react with :), so index 0 value now becomes 5. need a method to code this when ready. 


module.exports = blogs;