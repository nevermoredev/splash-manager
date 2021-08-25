
const express = require("express");
const app = express();
var axios = require('axios');
var fs = require('fs');

 

app.get("/getFile", function(request, response){
    idNow = request.query.id;
    urlNow = request.query.url;
    getFile(idNow,urlNow);
    response.send();
});


app.listen(26001); 

function getFile(idNow,urlNow){


var dirStorage = __dirname+'/storage/';

if (!fs.existsSync(dirStorage)) {
    try {
      fs.mkdirSync(dirStorage, { recursive: true });
    } catch (error) {
        console.error(error);
    }
} else {
    console.log('Folder find');

    fs.mkdir(`${dirStorage}${idNow}/`,{ recursive: true }, function(){
        fs.mkdir(`${dirStorage}${idNow}/`,{ recursive: true }, function(){
            return idNow;
        });
    });

}
var dir = `${__dirname}`;
var dateNow = Date.now();
var file = `${idNow}/${dateNow}.jpeg`;

var clientUrl = urlNow;
    axios({
        method: 'get',
        url: 'http://127.0.0.1:8050/render.jpeg?url='+clientUrl+'&render_all=1&wait=0.5&weight=1920&max=5000&min=1080',
        responseType: 'stream'
      })
        .then(function (response) {
      
          var fileNow = `${dirStorage}${file}`;
          response.data.pipe(fs.createWriteStream(fileNow));
          console.log(fileNow);
        });

}