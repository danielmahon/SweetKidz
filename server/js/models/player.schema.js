var Types = require("../../../shared/js/gametypes");

exports.name = 'Player';
exports.get = function(mongoose) {

  var PlayerSchema = new mongoose.Schema({
	name: String,
	type: {type: String, default: 'player'},
	x: Number,
	y: Number,
	weapon: {type: Number, default: Types.Entities.SWORD1},
	armor: {type: Number, default: Types.Entities.CLOTHARMOR},
	inventory: []
  });

  return PlayerSchema;
}