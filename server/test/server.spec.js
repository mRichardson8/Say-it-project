const request = require ("supertest");
const server = require('../server');

describe('API server', () => {
    let api
    let testBlog = {

        title:"Hello there!",
        post: "Hello there again!",
        image: "",
        reaction:[0, 1, 2],
        reply: ["hi", "test tesing"]
    }

    beforeAll(() => {
        // start the server and store it in the api variable
        api = server.listen(5000, () => console.log('Test server running on port 5000')) 
        jest.setTimeout(50000);
    })

    afterAll(done => { // `done` always gets passed in but if we want to use it, we must name it!
        // close the server, then run done
        console.log('Gracefully stopping test server')
        api.close(done) // `done` will be invoked when the `api.close` function is complete
    })  
    
    it('it responds to get / and shows hello world!', done => {
        request(api)
        .get('/')
        .expect(200,done)
    })

    it('test responds to get / blogs with statusCode 200', done => {
        request(api)
        .get('/blogs')
        .expect(200, done)
    })

    it('test responds to get / retrive blogs with their ids with statusCode 200', done => {
        request(api)
        .get('/blogs/1')
        .expect(200)
        .expect({
            "id": 1,
            "title": "this is my stuff",
            "post": "stuff",
            "image": "",
            "reaction": [
              2,
              0,
              0
            ],
            "reply": [
              "i like your stuff",
              "your stuff sucks",
              "i like eggs",
              "new reply"
            ]
          }, done)
    })

    it('it responds to get / gifs with the statusCode 200', done => {
        request(api)
        .get('/gifs')
        .expect(200, done)
    })

    it('it responds to get / gifs/cats with the statusCode 200', done => {
        request(api)
        .get('/gifs/cats')
        .expect(200, done)
    })

  it('it responds to post blogs with statusCode 201', done => {
    
     request(api)
    .post('/blogs')
    .expect(201, done)
  })

it('it responds to post blogs reactions with statusCode 201', done => {
    request(api)
    .post('/reactions')
    .expect(201, done)
})

it('it responds to post blogs replies with statusCode 201', done => {
    request(api)
    .post('/replies')
    .expect(201, done)
})

}) 
   