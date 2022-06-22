'use strict'

const http = require('http');

function webServer (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    debugger
    res.end('<h1>hola nodejs</h1>')
}

http.createServer(webServer)
.listen(3000, 'localhost');

console.log('servidor en http://localhost:3000/')

/**
 * node inspector -->
 * supervisor -->
 * nodemon --->
 * forever --->
 * pm2 -->
 */