var express = require('express');
var request = require('request');
var bodyParse = require('body-parser');
var Repo = require('../database/index');

var app = express();
app.use(bodyParse.json());
app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParse.urlencoded({extended: true}));

app.post('/repos/import', function (req, res) {
  // TODO
  var ownerName = req.body.term;
  var url = `https://api.github.com/users/${ownerName}/repos`;
  var reposData = []
  //fetch data from api
  request({
    method: 'GET',
    uri: url,
    headers: {'User-Agent': 'fullstack'}
  } , (err, res, body) => {
    if (err) {
      console.log('fail to fetch data from Github Api')
      throw err;
    }
    console.log('success to fetch data from Github Api');
    reposData = JSON.parse(body);
    // console.log(JSON.parse(reposData)[0].name);
    var id = reposData[0].id;
    var reponame = reposData[0].name;
    var owner = reposData[0].owner.login;
    var created_at = reposData[0].created_at;
    console.log(id);
    console.log(reponame);
    console.log(owner);
    console.log(created_at);
  });
  //put datas into database

  // console.log(Repo.find.toString());

  res.end();
});

app.get('/repos', function (req, res) {
  // TODO
});

var port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

