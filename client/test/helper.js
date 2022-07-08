async function submitEmoji(e, index) {
    console.log("clicked", index);
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
    if (response.status(204)) {
      //e.currentTarget.children[1].innerText = (parseInt(e.currentTarget.children[1].innerText) + 1).toString()
    } else {
      console.log("Huge error");
      console.log(response.body);
    }
  }

module.exports = {
    submitEmoji
}
