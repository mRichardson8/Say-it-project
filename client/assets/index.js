// test variables
let testObj = [
{
    title: "Why not",
    post: "Why not take a crazy chance, why not do a crazy dance!",
    reactions: [1,2,3],
    reply   : ["I love Hilary Duff", "I hate Hilary Duff", "I think Hilary Duff is just right"]
},
{
    title: "Just can't get enough",
    post: "When I'm with you baby, I go out of my head. And I just can't get enough, And I just can't get enough.",
    reactions: [1,2,3],
    reply: ["Depeche mode is the best", "Who is depeche mode?"]
}]

//functions 
//! This function runs when the window first loads and retrieves all the posts from the server. For each post retrieved, the createPost function is called passing in that post as an argument
async function getPosts(){
    try{
        let response = await fetch('/')
        let data = await response.json()
        for (let i = 0; i < data.length; i++) {
            createPost(data[i])
        }
    } catch(err){
        console.log(err)
    }
}

//! For testing createPost before server implementation
function getTestPosts(){
    let data = testObj
    for (let i = 0; i < data.length; i++) {
        createPost(data[i]);
    }
}

//! This function takes in an individual post and renders the post, the reactions and the comments as HTML
function createPost(data){
    let postList = document.getElementById('post-list')
    let postBox = document.createElement('div');
    let title = document.createElement('h2');
    title.innerText = data.title;
    let text = document.createElement('p');
    text.innerText = data.post;
    let reactions = document.createElement('div');
    // add function to populate the reactions div
    let replies = document.createElement('div');
    //add function to populate the replies div
    postBox.append(title, text, reactions, replies)
    postList.appendChild(postBox)
}

//event listeners



//Run the setup
getTestPosts()
