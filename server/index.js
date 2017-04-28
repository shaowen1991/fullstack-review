var express = require('express');
var request = require('request');
var bodyParse = require('body-parser');
var Repo = require('../database/index');
// var fs = require('fs');
// var mockData = fs.readFileSync('data.json');
var apiToken = require('../apiToken');
// mockData = JSON.parse(mockData);

var app = express();
app.use(bodyParse.json());
app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParse.urlencoded({extended: true}));

app.post('/repos/import', function (req, res) {
  // TODO
  var ownerName = req.body.term;
  var url = `https://api.github.com/users/${ownerName}/repos?access_token=${apiToken}`;
  // fetch data from api
  var postRes = res;
  request(
    {
      method: 'GET',
      uri: url,
      headers: {'User-Agent': 'shaowen'}
    },
    (err, res, body) => {
      if (err) {
        console.log('fail to fetch data from Github Api')
        throw err;
      }
      console.log('success to fetch data from Github Api');

      Promise.resolve(JSON.parse(body))
        .then(reposData => {
          //for each raw data, update it into database
          Repo.insertRepo(reposData);
        })
        .then(() => {
          console.log('REPO DATA PROCESSED!');
          postRes.end();
        })
        .catch(err => {
          console.log("REPO DATA ERR!");
        })
    });
});

app.get('/repos', function (req, res) {
  Repo.getRepo(req, res);
});

var port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

