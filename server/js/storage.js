// Dependencies  
var fs = require('fs'),
	mongoose = require('mongoose'),
	schemas = {},
	model = {};

mongoose.connect('mongodb://guest:guest@127.0.0.1/sweetkidz');

/**
* Schemas
*/
fs.readdirSync(__dirname+'/models').forEach(function(file){
  if(file.match(/\.js$/)) {
    var s = require('./models/' + file);
    if(s.name) {
      schemas[s.name] = s.get(mongoose);
    }
  }
});

/**
* Models
*/
_.each(schemas, function(schema, name){
  model[name] = mongoose.model(name, schema);
});

exports.schemas = schemas;
exports.model = model;