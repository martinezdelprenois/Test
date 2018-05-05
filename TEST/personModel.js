var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var personSchema = Schema({
 
  name: String,
  age: Number,
  stories: { type: Schema.Types.ObjectId, ref: 'Story' },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Person', personSchema, 'Person');