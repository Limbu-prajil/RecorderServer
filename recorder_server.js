const fs  = require('fs');
const http = require('http');
const qs = require('querystring');
const static = require('node-static');

const recorderDocument = fs.readFileSync('public/index.html', 'utf-8');
const recorderCss = fs.readFileSync('public/recorder.css', 'utf-8');
const recorderJs = fs.readFileSync('public/recorder.js', 'utf-8');
const toneLibraryJs = fs.readFileSync('public/Tone-muted.js', 'utf-8');

const playerDocument = fs.readFileSync('public/player.html', 'utf-8');
const playerJs = fs.readFileSync('public/player.js', 'utf-8');
const simplePlayerJs = fs.readFileSync('public/SimplePlayer.js', 'utf-8');

const file = new static.Server('./public');

http.createServer(function (req, res) {

  if(req.method === 'GET') {
    req.addListener('end', function () {
        file.serve(req, res, function (error) {
            if (error && error.status === 404) {
                file.serveFile('./not_found.html', 404, {}, req, res);
            }
        });
    }).resume()
  }

  if(req.method === 'POST') {
    let body = "";
    req.on('data', function (chunk) {
      body += chunk;
    });
    req.on('end', function () {
      // You should replace the following two lines with your solution
      let parsedBody = qs.parse(body);
      let parsedNotes = parsedBody.note_names;
      let splitDoc = playerDocument.split('-!-');
      res.writeHead(200);
      res.end(splitDoc[0] + parsedNotes + splitDoc[1]);
    });
  }
}).listen(3000);
