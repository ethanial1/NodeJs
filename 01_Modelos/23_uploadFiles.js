'use strinct';

const http = require('http').createServer(serverUpload),
    util = require('util'),
    formidable = require('formidable'),
    fse = require('fs-extra');

function serverUpload(req, res) {
    if(req.method.toLowerCase() === 'get') {
        var form = `
            <h1></h1>
            <form action="/upload" enctype="multipart/form-data" method="post">
                <div> <input type="file" name="file" id="file" required></di>
                <div> <input type="submit" value="subir archivo"></di>
            </form>
        `;

        res.writeHead(200, {'Content-type': 'text/html'})
        res.end(form);
    }

    if(req.method.toLowerCase() === 'post' && req.url === '/upload') {
        let form = new formidable.IncomingForm();

        form.parse(req, function (err, fields, files) {
            res.writeHead(200, {'Content-type': 'text/html'});
            res.write('<h1>archivos recibidos</h1>' + util.inspect({ files: files}))
            res.end()
        })
        .on('progress', function(bytesReceived, bytesExpected) {
            let percentCompleted = ( bytesReceived / bytesExpected ) * 100;
            console.log(percentCompleted)
        })
        .on('error', function (err) {
            console.log(err)
        })
        .on('end', function (fields, files) {
            // ubicación temporal del archvio que se sube
            let tempPath = this.openedFiles[0].path,
                // nombre del archivo 
                fileName = this.openedFiles[0].name,
                // nueva ubicación
                newLocation = './upload/' + fileName;
            
            fse.copy(tempPath, newLocation, function (err) {
                return (err) ? console.log(err) : console.log('el archivo se subió con éxito :)');
            })
        })
    }
}

http.listen(3000);
console.log('Servidor en el puerto 3000')