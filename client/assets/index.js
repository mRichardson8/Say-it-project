// test variables
let testObj = [
  {
    title: "Why not",
    post: "Why not take a crazy chance, why not do a crazy dance!",
    reactions: [1, 2, 3],
    reply: [
      "I love Hilary Duff",
      "I hate Hilary Duff",
      "I think Hilary Duff is just alright",
    ],
  },
  {
    title: "Just can't get enough",
    post: "When I'm with you baby, I go out of my head. And I just can't get enough, And I just can't get enough.",
    reactions: [1, 2, 3],
    reply: ["Depeche mode is the best", "Who is depeche mode?"],
  },
];

//functions
//! This function runs when the window first loads and retrieves all the posts from the server. For each post retrieved, the createPost function is called passing in that post as an argument

async function getPosts() {
  try {
    let response = await fetch("localhost:3000/");
    let data = await response.json();
    for (let i = 0; i < data.length; i++) {
      createPost(data[i]);
    }
    addEmojiListeners()
  } catch (err) {
    console.log(err);
  }

}

//! For testing createPost before server implementation
function getTestPosts() {
  let data = testObj;
  for (let i = 0; i < data.length; i++) {
    createPost(data[i]);
  }
  addEmojiListeners()
}

//! This function takes in an individual post and renders the post, the reactions and the comments as HTML

function createPost(data) {
  let postList = document.getElementById("post-list");
  let postBox = document.createElement("div");
  postBox.setAttribute("class", "post-box");
  let title = document.createElement("h2");
  title.setAttribute("class", "post-title");
  title.innerText = data.title;
  let text = document.createElement("p");
  text.setAttribute("class", "post-text");
  text.innerText = data.post;
  let reactions = createReactions(data.reactions);
  // add function to populate the reactions div
  let replies = document.createElement("div");
  //add function to populate the replies div
  postBox.append(title, text, reactions, replies);
  postList.appendChild(postBox);
}

function createReactions(reactArr) {
  //reactArr = [1,2,3]
  let reactions = document.createElement("div");
  reactions.setAttribute("class", "reactions-wrapper");
  //TODO read from the array of reactions and create a div populated with the reaction emojis and their respective numbers
  let div1 = document.createElement("div");
  div1.setAttribute("class", "emoji-container");
  let span1 = document.createElement("span");
  span1.setAttribute("class", "emoji-count");
  span1.innerText = reactArr[0];
  let img1 = document.createElement("img");
  img1.src = "./assets/panic.gif";
  img1.setAttribute("class", "img-emoji");
  div1.append(img1, span1);
  let div2 = document.createElement("div");
  div2.setAttribute("class", "emoji-container");
  let span2 = document.createElement("span");
  span2.setAttribute("class", "emoji-count");
  span2.innerText = reactArr[1];
  let img2 = document.createElement("img");
  img2.src = "./assets/emoji2.png";
  img2.setAttribute("class", "img-emoji");
  div2.append(img2, span2);
  let div3 = document.createElement("div");
  div3.setAttribute("class", "emoji-container");
  let span3 = document.createElement("span");
  span3.setAttribute("class", "emoji-count");
  span3.innerText = reactArr[2];
  let img3 = document.createElement("img");
  img3.src = "./assets/emoji3.png";
  img3.setAttribute("class", "img-emoji");
  div3.append(img3, span3);
  reactions.append(div1, div2, div3);
  return reactions;
}

function createReplies(repliesArr) {
  let replies = document.createElement("div");
  //TODO read from the array of replies and create a div populated with each string as a separate reply
  return replies;
}

function submitPost(e) {
  return;
}

async function submitEmoji(e, index){
  console.log("clicked", index)
  e.currentTarget.children[1].innerText = (parseInt(e.currentTarget.children[1].innerText) + 1).toString()
  let response = await fetch('localhost:3000/new', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({index: index})
  })
  if (response.status(204)){ 
    //e.currentTarget.children[1].innerText = (parseInt(e.currentTarget.children[1].innerText) + 1).toString()
  } else{
      console.log("Huge error")
      console.log(response.body)
  }
}


function addEmojiListeners(){
  document.querySelectorAll('.post-box div div:nth-child(1)').forEach((emoji) => {
      emoji.addEventListener('click', emoji1Func)
  })
  document.querySelectorAll('.post-box div div:nth-child(2)').forEach((emoji) => {
      emoji.addEventListener('click', emoji2Func)
  })
  document.querySelectorAll('.post-box div div:nth-child(3)').forEach((emoji) => {
      emoji.addEventListener('click', emoji3Func)
  })
}

function emoji1Func(event){
  submitEmoji(event, 0)
  event.currentTarget.removeEventListener('click', emoji1Func)
}
function emoji2Func(event){
  submitEmoji(event, 1)
  event.currentTarget.removeEventListener('click', emoji2Func)
}
function emoji3Func(event){
  submitEmoji(event, 2)
  event.currentTarget.removeEventListener('click', emoji3Func)
}


//event listeners

// add a new div to handle the gif keyboard, this dif starts with display set to none but when button is clicked it becomes flex
let gifBtn = document.getElementById("gif-btn");
gifBtn.addEventListener("click", (e) => {
  let gifDiv = document.getElementById("gif-cont");
  gifDiv.style.display = "flex";
});

//details from new blog post are sent as a post request to the server. If successful the page reloads
let newPostForm = document.getElementById("new-post-form");
newPostForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let postTitle = "title"; // document.getElementById('post-title').value //TODO need to add a text input for title in the form
  let postBody = document.getElementById("form-text").value;
  let postGif = ""; //document.getElementById('post-img').src //TODO need to add blank img into the form details
  let response = await fetch("localhost:3000/new", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: postTitle, post: postBody, img: postGif }),
  });
  if (response.status(204)) {
    location.reload();
  } else {
    console.log("Huge error");
    console.log(response.body);
  }
});

//Run the setup
getTestPosts();
