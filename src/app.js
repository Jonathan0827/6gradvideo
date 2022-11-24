// modules
const busboy = require('busboy')
const express = require('express')
const fileUpload = require('express-fileupload');
const cors = require('cors');
// variables
const port = 4000
var app = express()
app.use(cors())
app.use(fileUpload())

console.log(__dirname)

app.get('/', (req, res) => {res.status(200).sendFile(__dirname+"/public/index.html")
})

app.post('/upload', (req, res) => {
  let uploadFile;
  let uploadPath;
  console.log(req.body.title)
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  uploadFile = req.files.fileToUpload;
  uploadPath = __dirname + '/uploads/' + req.body.title;

  // Use the mv() method to place the file somewhere on your server
  uploadFile.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });
})
// 404
app.get('*', (req, res) => {res.status(404).sendFile(__dirname+"/public/404.html")
})
// listen server
app.listen(port, () => {
  console.log(`server is live in localhost:${port}`)
})
