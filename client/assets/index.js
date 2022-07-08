async function getPosts() {
  try {
    let response = await fetch("https://say-it-project.herokuapp.com/blogs");
    let data = await response.json();
    for (let i = 0; i < data.length; i++) {
      try {
        createPost(data[i]);
      } catch (error) {
        continue;
      }
    }
    addEmojiListeners();
  } catch (err) {
    console.log("error collecting blogs from server");
  }
}

async function getTrendingGifs() {
  try {
    let response = await fetch("https://say-it-project.herokuapp.com/gifs");
    let data = await response.json();
    createGifs(data.data);
  } catch (err) {
    console.log("error fetching trending gifs");
  }
}

async function getSearchGifs() {
  try {
    let searchTerm = document.querySelector(".gif-box input").value;
    let response = await fetch(
      `https://say-it-project.herokuapp.com/gifs/${searchTerm}`
    );
    let data = await response.json();
    createGifs(data.data);
  } catch (err) {
    console.log("error fetching search endpoint gifs");
  }
}

function createGifs(gifData) {
  let imageBox = document.querySelector(".image-box");
  imageBox.textContent = "";
  for (let i = 0; i < gifData.length; i++) {
    let img = document.createElement("img");
    img.src = gifData[i].images.downsized.url;
    img.addEventListener("click", () => {
      let postImage = document.querySelector("#form-img");
      postImage.src = img.src;
    });
    imageBox.appendChild(img);
  }
}

function createPost(data) {
  let postList = document.getElementById("post-list");
  let postBox = document.createElement("div");
  postBox.setAttribute("class", "post-box");
  let title = document.createElement("h2");
  title.setAttribute("class", "post-title");
  title.innerText = data.title;
  let date = document.createElement("p");
  date.setAttribute("class", "date-post");
  let dateText = new Date();
  dateText.setTime(Date.parse(data.date));
  date.innerText = `Post created: ${dateText.toString().slice(0, 24)}`;
  let text = document.createElement("p");
  let image = document.createElement("img");
  image.src = data.image;
  image.setAttribute("class", "post-image");
  text.setAttribute("class", "post-text");
  text.innerText = data.post;
  let btnPost = document.createElement("button");
  btnPost.setAttribute("class", "btn");
  btnPost.textContent = "reply";
  let reactions = createReactions(data.reaction);
  let replies = createReplies(data.reply);
  let replyBox = createReplyBox();
  addReplyListeners(btnPost, replyBox);
  replies.setAttribute("class", "post-replies");
  reactions.append(btnPost);
  postBox.append(title, date, image, text, reactions);
  postList.append(postBox, replyBox, replies);
}

function createReactions(reactArr) {
  let reactions = document.createElement("div");
  reactions.setAttribute("class", "reactions-wrapper");
  let div1 = document.createElement("div");
  div1.setAttribute("class", "emoji-container");
  let span1 = document.createElement("span");
  span1.setAttribute("class", "emoji-count");
  span1.innerText = reactArr[0];
  let img1 = document.createElement("img");
  img1.src = "./assets/images/homer-disappear.gif";
  img1.setAttribute("class", "img-emoji");
  div1.append(img1, span1);
  let div2 = document.createElement("div");
  div2.setAttribute("class", "emoji-container");
  let span2 = document.createElement("span");
  span2.setAttribute("class", "emoji-count");
  span2.innerText = reactArr[1];
  let img2 = document.createElement("img");
  img2.src = "./assets/images/cool-doge.gif";
  img2.setAttribute("class", "img-emoji");
  div2.append(img2, span2);
  let div3 = document.createElement("div");
  div3.setAttribute("class", "emoji-container");
  let span3 = document.createElement("span");
  span3.setAttribute("class", "emoji-count");
  span3.innerText = reactArr[2];
  let img3 = document.createElement("img");
  img3.src = "./assets/images/meow_code.gif";
  img3.setAttribute("class", "img-emoji");
  div3.append(img3, span3);
  reactions.append(div1, div2, div3);
  return reactions;
}

function createReplies(repliesArr) {
  let replies = document.createElement("div");
  if (repliesArr.length == 0) {
    replies.style.visibility = "hidden";
  }
  repliesArr.forEach((string) => {
    let p = document.createElement("p");
    p.setAttribute("class", "reply-text");
    p.innerText = string;
    replies.appendChild(p);
  });
  return replies;
}

function appendReply(postIndex, replyText) {
  replies = document.getElementById("post-list").children[postIndex];
  replies.style.visibility = "visible";
  let p = document.createElement("p");
  p.setAttribute("class", "reply-text");
  p.innerText = replyText;
  replies.appendChild(p);
}


async function submitEmoji(e, index) {
  let parent = e.currentTarget.parentNode.parentNode.parentNode;
  let child = e.currentTarget.parentNode.parentNode;
  let postID = Array.prototype.indexOf.call(parent.children, child);
  e.currentTarget.children[1].innerText = (
    parseInt(e.currentTarget.children[1].innerText) + 1
  ).toString();
  let response = await fetch("https://say-it-project.herokuapp.com/reactions", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ index: index, id: (postID + 3) / 3 }),
  });
}

function addEmojiListeners() {
  document
    .querySelectorAll(".post-box div div:nth-child(1)")
    .forEach((emoji) => {
      emoji.addEventListener("click", emoji1Func);
    });
  document
    .querySelectorAll(".post-box div div:nth-child(2)")
    .forEach((emoji) => {
      emoji.addEventListener("click", emoji2Func);
    });
  document
    .querySelectorAll(".post-box div div:nth-child(3)")
    .forEach((emoji) => {
      emoji.addEventListener("click", emoji3Func);
    });
}

function emoji1Func(event) {
  submitEmoji(event, 0);
  event.currentTarget.removeEventListener("click", emoji1Func);
}
function emoji2Func(event) {
  submitEmoji(event, 1);
  event.currentTarget.removeEventListener("click", emoji2Func);
}
function emoji3Func(event) {
  submitEmoji(event, 2);
  event.currentTarget.removeEventListener("click", emoji3Func);
}

function createReplyBox() {
  let replyDiv = document.createElement("div");
  replyDiv.setAttribute("class", "reply-box");
  let replyInput = document.createElement("input");
  replyInput.setAttribute("class", "reply-input");
  replyInput.type = "text";
  replyInput.maxLength = 140;
  let submitReply = document.createElement("button");
  submitReply.type = "submit";
  submitReply.innerText = "Submit";
  submitReply.setAttribute("class", "reply-btn");
  submitReply.addEventListener("click", () => {
    let parent = replyDiv.parentNode;
    let child = replyDiv;
    var index = Array.prototype.indexOf.call(parent.children, child);
    postReply(replyInput.value, (index + 2) / 3);
    replyDiv.style.display = "none";
    appendReply(index + 1, replyInput.value);
    replyInput.value = "";
  });
  replyDiv.append(replyInput, submitReply);
  replyDiv.style.display = "none";
  return replyDiv;
}

function addReplyListeners(button, div) {
  button.addEventListener("click", () => {
    div.style.display = "flex";
  });
}

async function postReply(replyText, postID) {
  try {
    let response = await fetch("https://say-it-project.herokuapp.com/replies", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: replyText, id: postID }),
    });
  } catch (err) {
    console.log("error posting reply");
  }
}

function createGifBox() {
  gifDiv.setAttribute("class", "gif-box");
  let inputWrapper = document.createElement("div");
  inputWrapper.setAttribute("class", "input-wrapper");
  let gifSearch = document.createElement("input");
  let gifBtnContainer = document.createElement("div");
  gifBtnContainer.setAttribute("class", "gif-btn-container");
  gifSearch.type = "search";
  gifSearch.placeholder = "Enter a search term";
  gifSearch.setAttribute("class", "gif-input");
  inputWrapper.append(gifSearch, gifBtnContainer);
  let gifSearchBtn = document.createElement("button");
  gifSearchBtn.type = "button";
  gifSearchBtn.textContent = "Search";
  gifSearchBtn.addEventListener("click", getSearchGifs);
  gifCloseBtn.textContent = "Close";
  gifCloseBtn.type = "button";
  gifBtnContainer.append(gifSearchBtn, gifCloseBtn);
  let imgDiv = document.createElement("div");
  imgDiv.setAttribute("class", "image-box");
  gifDiv.append(inputWrapper, imgDiv);
  document.getElementById("new-post-form").appendChild(gifDiv);
  gifDiv.style.display = "none";
  getTrendingGifs();
}

const gifBtn = document.getElementById("gif-btn");
const gifDiv = document.createElement("div");
const gifCloseBtn = document.createElement("button");
createGifBox();

gifBtn.addEventListener("click", (e) => {
  if (gifDiv.style.display == "none") {
    gifDiv.style.display = "block";
  } else {
    gifDiv.style.display = "none";
  }
});

gifCloseBtn.addEventListener("click", () => {
  gifDiv.style.display = "none";
});

let newPostForm = document.getElementById("new-post-form");
newPostForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let postTitle = document.getElementById("form-title").value;
  let postBody = document.getElementById("form-text").value;
  let postGif = document.getElementById("form-img").src;
  let response = await fetch("https://say-it-project.herokuapp.com/blogs", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: postTitle,
      post: postBody,
      image: postGif,
      reaction: [0, 0, 0],
      reply: [],
    }),
  });
  location.reload();
});

let postText = document.getElementById("form-text");
postText.addEventListener("input", (e) => {
  if (postText.value.length > 140) {
    postText.value = postText.value.slice(0, 140);
  }
  let textCounter = document.getElementById("text-counter");
  textCounter.innerText = `${
    140 - postText.value.length
  } characters remaining`.toString();
});

getPosts();
