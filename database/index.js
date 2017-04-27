var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

var repoSchema = mongoose.Schema({
  // TODO: your schema here!
  reponame: String,
  owner: String,
  created_at: Date
});

var Repo = mongoose.model('Repo', repoSchema);


module.exports = Repo;