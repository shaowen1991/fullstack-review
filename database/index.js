var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

var repoSchema = mongoose.Schema({
  // TODO: your schema here!
  repo_id: Number,
  reponame: String,
  owner: String,
  created_at: Date
});

var Repo = mongoose.model('Repo', repoSchema);

Repo.insertRepo = (reposData) => {
  reposData.forEach((repo) => {
    //make record obj from raw data
    var newRecord = {
      repo_id: repo.id,
      reponame: repo.name,
      owner: repo.owner.login,
      created_at: repo.created_at
    }
    //put datas into database
    Repo.findOneAndUpdate(
      {repo_id: newRecord.repo_id},
      {$set: newRecord},
      {upsert: true},
      () => {console.log('insert success')}
    )
  }, this);
}

Repo.getRepo = (req, res) => {
  Repo.find()
  .limit(25)
  .sort('-created_at')
  .select('reponame owner created_at')
  .exec((err, data) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log("repo data send back to client");
      res.send(data);
    }
  })
}
module.exports = Repo;

