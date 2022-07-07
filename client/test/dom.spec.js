/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
let testBlog = {posts : [{
    "id": 1,
    "title": "this is my stuff",
    "post": "stuff",
    "image": "",
    "reaction": [
      2,
      1,
      3
    ],
    "reply": [
      "i like your stuff",
      "your stuff sucks",
      "i like eggs",
      "new reply"
    ]
  }]}

  let indexFunctions;
  let getPosts

describe('index.js', () => {
    global.fetch = require('jest-fetch-mock')

    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
        indexFunctions = require('../assets/index')
        getPosts = indexFunctions.getPosts
    });
    afterEach(() => {
        fetch.resetMocks();
    });
    
    it('Document should be loaded', () => {
        expect(document).not.toBeNull()
    })
    it('should run the getPosts function startup', ()=>{
        getPosts()
        fetch.mockResponse(testBlog)
        let postList = document.querySelector('#post-list')
        console.log(postList)
        expect(postList).toBeDefined()
    })
    it ('A gif box should be created on startup with two children', () => {
        indexFunctions.createGifBox()
        let gifDiv = document.querySelector('.gif-box')
        expect(gifDiv.children.length).toEqual(2)
    })
    it ('should have a new post be created using the post object received', () => {
        indexFunctions.createPost(testBlog.posts[0])
        let postList = document.querySelector('#post-list')
        expect(postList.children.length).toEqual(3)
    })
    it ('Should populate the page with dummy posts if the getTestPosts function is called', () => {
        indexFunctions.getTestPosts()
        let postList = document.querySelector('#post-list')
        expect(postList.children.length).toEqual(6)
    })
    it ('Should add a div containing the emojis and related emoji data', () => {
        indexFunctions.createReactions([1,2,3])
        let reactDiv = document.querySelector('.reactions-wrapper')
        expect(reactDiv.children.length).toEqual(3)

    })
});
