var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EdgeSchema = new Schema({  
  id: String,
  source: {
    id: String,
    weight: Number
  },
  target: {
    id: String,
    weight: Number
  }
});

var VertexSchema = new Schema({  
  id: String,
  title: String,
  content: Schema.Types.Mixed
});


var Edge = mongoose.model('Edge', EdgeSchema);  
var Vertex = mongoose.model('Vertex', VertexSchema);

module.exports = { vertex: Vertex, edge: Edge };
