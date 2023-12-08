const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: String,
  url:String,
  likes: Number,
  comments: Number,
  views: Number,
  calculatedEarnings: Number,
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
