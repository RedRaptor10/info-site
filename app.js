/* Rewritten using Express */

const express = require('express');
const app = express();
const hostname = '127.0.0.1';
const port = process.env.PORT || 8080;

app.get('/(:page)?', function(req, res) { // '/(:page)?' listens for request on '/' path and optional :page (regEx)
    let options = {
        root: __dirname, // Set root option to enable relative paths
    }

    let filename = '';
    if (!req.params.page) {
        filename = 'index.html';
    } else {
        filename = req.params.page + '.html';
    }

    res.sendFile(filename, options, function(err) {
        if (err) {
            res.sendFile('404.html', options);
        }
    });
})

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});