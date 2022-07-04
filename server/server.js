const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = process.env.port || 3000;



const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req,res) => {
    res.send('hello world!');
})


app.listen(port, () => { console.log(`server running on port ${port}`)});


module.exports = app;