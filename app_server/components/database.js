const mongoose = require("mongoose");

const methods = {
	models: new Array(),
	identifiers: new Array(),
	initializeDatabase : function() {
		const uri = "mongodb+srv://user187:js12345@cluster0.lxbjfoq.mongodb.net/MusicalConcertDatabase?retryWrites=true&w=majority";
		let conStatus = false;
		try {
			mongoose.connect(uri);
			conStatus = true;
		} catch (err) {
			conStatus = false;
		}
		if (conStatus) console.log("Connected to " + uri);
	},
	createObject: function(blueprint, namespace, identifier) {
			const out = mongoose.Schema(blueprint);
			this.models.push(mongoose.model(namespace, out));
			this.identifiers.push(identifier);
	},
	findModelById: function(identifier) {
		for (let i = 0; i < this.models.length; i++) {
			if (this.identifiers[i] == identifier) {
				return this.models[i];
			}
		}
		console.log("Model not found: " + identifier);
	},
	persistObject: function(model) {
		model.save();
	},
	retrieveObjectArray: function(obj, identifier) {
		return this.findModelById(identifier).find(obj).exec();
	},
};

module.exports = methods;