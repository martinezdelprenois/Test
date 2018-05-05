var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var storySchema = Schema({
  author: { type: Schema.Types.ObjectId, ref: 'Person' },
  title: String,
  fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }]
});

module.exports = mongoose.model('story', storySchema, 'story');