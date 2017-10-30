var bcrypt = require('bcrypt');
var MongoClient = require('mongodb').MongoClient
  , assert = require('assert')
  , ObjectID = require('mongodb').ObjectID;
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;  
var Schema = mongoose.Schema;
var schemas = require('./schemas');
var Vertex = schemas.vertex;
var Edge = schemas.edge;

// var insertDocuments = function(db, callback) {
//   // Get the documents collection
//   var collection = db.collection('documents');
//   // Insert some documents
//   collection.insertMany([
//     {a : 1}, {a : 2}, {a : 3}
//   ], function(err, result) {
//     assert.equal(err, null);
//     assert.equal(3, result.result.n);
//     assert.equal(3, result.ops.length);
//     console.log("Inserted 3 documents into the document collection");
//     callback(result);
//   });
// }

// Connection URL
const url = 'mongodb://localhost:27017/myproject';
// Use connect method to connect to the Server
var db = null;


module.exports.mongo = {
  // connect: function () { 
  //     MongoClient.connect(url, function(err, DB) {
  //     console.log("Connected correctly to server");
  //     db = DB;
  //     // assert.equal(null, err);
  //     // insertDocuments(db, function() {
  //     //   db.close();
  //     // });
  //     // db.close();
  //   })
  // },

  connectMongoose: function () {
    mongoose.connect('mongodb://localhost:27017/myproject', {useMongoClient: true, config: { autoIndex: false } });
  },

  // insertMany: function (callback) {
  //   var collection = db.collection('documents');
  //   // Insert some documents
  //   collection.insertMany([
  //     {a : 1}, {a : 2}, {a : 3}
  //   ], function(err, result) {
  //     assert.equal(err, null);
  //     assert.equal(3, result.result.n);
  //     assert.equal(3, result.ops.length);
  //     console.log("Inserted 3 documents into the document collection");
  //     callback(result);
  //   });
  // },

  // getAll: function (callback) {
  //   var collection = db.collection('users');
  //   collection.find({}).toArray(function(err, users) {
  //     callback(users);
  //   });
  // },

  // getAllArticles: function (callback) {
  //   var collection = db.collection('articles');
  //   collection.find({}).toArray(function(err, articles) {
  //     callback(articles);
  //   });
  // },

  // addArticle: function (data, callback) {
  //   var collection = db.collection('articles');
  //   collection.insertOne({title: data.title, description: data.description}, function(err, result) {
  //     callback(result);
  //   });
  // },

  // removeArticle: function (articleId, callback) {
  //   var collection = db.collection('articles');
  //   collection.deleteOne({_id: ObjectID(articleId)}, function(err, result) {
  //     callback(result);
  //   });
  // },

  // signUp: function (data, callback) {
  //   var collection = db.collection('users');
  //   collection.insertOne({email: data.email, password: data.password}, function(err, result) {
  //     callback(result);
  //   });
  // },
  // checkPassword: function (data, callback) {
  //   var collection = db.collection('users');
  //   collection.findOne({email: data.email}, function(err, result) {
  //     bcrypt.compare(data.password, result.password, function(err, res) {
  //       callback(res);
  //     });
  //   });
  // },
  addVertex: function (data) {
    var vertex = new Vertex({ title: data.title, content: data.content });
    return vertex.save();
  },

  editVertex: function (data) {
    return Vertex.find({_id: data.vertex._id}).exec().then(function (vertex) {
      vertex = Object.assign(data.changed, vertex);
      return Vertex.update({_id: data.vertex._id}, vertex).exec().then(function () {
        return vertex;
      });
    });
    
    // var vertex = new Vertex({_id: data.id, title: data.title, content: data.content });
    // return vertex.update();
  },
  
  getVertexById: function (id) {
    return Vertex.findById(id);  // check this one
  },

  getAllVertexes: function () {
    return Vertex.find({}).exec();
  },

  removeVertex: function (id) {
    return Vertex.remove({_id: id});
  },

  addEdge: function (data) {
    if (!data.weight) data.weight = 1;
    var edge = new Edge({
      weight: data.weight,
      source: {
        id: data.source
      },
      target: {
        id: data.target
      }
    });
    return edge.save();
  },
  
  getEdgeById: function (id) {
    return Edge.findById(id).exec();  // check this one
  },

  getAllEdges: function () {
    return Edge.find({}).exec();
  },

  removeEdge: function (id) {
    return Edge.remove({_id: id});
  }
}