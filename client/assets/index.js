// test variables
let testObj = [
{
    title: "Why not",
    post: "Why not take a crazy chance, why not do a crazy dance!",
    reactions: [1,2,3],
    reply   : ["I love Hilary Duff", "I hate Hilary Duff", "I think Hilary Duff is just alright"]
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
        let response = await fetch('localhost:3000/')
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
    // let reactions = createReactions(data.reactions)
    let replies = document.createElement('div');
    // let replies = createReplies(data.replies)
    postBox.append(title, text, reactions, replies)
    postList.appendChild(postBox)
}

function createReactions(reactArr){
    let reactions = document.createElement('div')
    //TODO read from the array of reactions and create a div populated with the reaction emojis and their respective numbers
    return reactions
}

function createReplies(repliesArr){
    let replies = document.createElement('div')
    //TODO read from the array of replies and create a div populated with each string as a separate reply
    return replies
}

function submitPost(e){
    return
}
//event listeners

// add a new div to handle the gif keyboard, this dif starts with display set to none but when button is clicked it becomes flex
let gifBtn = document.getElementById('gif-btn')
gifBtn.addEventListener('click', (e) => {
    let gifDiv = document.getElementById('gif-cont')
    gifDiv.style.display = 'flex'
});

//details from new blog post are sent as a post request to the server. If successful the page reloads
let newPostForm = document.getElementById('new-post-form')
newPostForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    let postTitle = "title" // document.getElementById('post-title').value //TODO need to add a text input for title in the form
    let postBody = document.getElementById('form-text').value
    let postGif = "" //document.getElementById('post-img').src //TODO need to add blank img into the form details
    let response = await fetch('localhost:3000/new', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({title: postTitle, post: postBody, img: postGif})
    })
    if (response.status(204)){ 
        location.reload()
    } else{
        console.log("Huge error")
        console.log(response.body)
    }
    
})

//Run the setup
getTestPosts()
