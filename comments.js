//create a web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const path = require('path');

//set up the port
const PORT = process.env.PORT || 3000;

//set up the body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//read the comments from the file
app.get('/api/comments', (req, res) => {
    fs.readFile(path.join(__dirname, 'comments.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Internal server error');
            return;
        }
        res.json(JSON.parse(data));
    });
});

//write the comments to the file
app.post('/api/comments', (req, res) => {
    fs.readFile(path.join(__dirname, 'comments.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Internal server error');
            return;
        }
        const comments = JSON.parse(data);
        comments.push(req.body);
        fs.writeFile(path.join(__dirname, 'comments.json'), JSON.stringify(comments), (err) => {
            if (err) {
                res.status(500).send('Internal server error');
                return;
            }
            res.json(comments);
        });
    });
});

//start the server
app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});