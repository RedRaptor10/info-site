const http = require('http');
const hostname = '127.0.0.1';
const port = process.env.PORT || 8080;
const fs = require('fs');

const errorPage = fs.readFileSync('404.html', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    return data;
});

const server = http.createServer(function(req, res) {
    // const myURL = url.parse(req.url, true); // Legacy API (deprecated)
    const myURL = new URL(req.url, `http://${hostname}:${port}/`); // WHATWG URL API: new URL(input[,base])

    let filename = '';
    if (myURL.pathname === '/') {
        filename = 'index.html'; // Home Page
    } else {
        filename = '.' + myURL.pathname + '.html';
    }

    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.write(errorPage);
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
        }

        return res.end();
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});