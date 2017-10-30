const mongo = require('./mongo').mongo;

module.exports = {
	vertexId: function (id) {
		if (typeof id !== 'string') return false;
		return mongo.getVertexById(id);
	}
}