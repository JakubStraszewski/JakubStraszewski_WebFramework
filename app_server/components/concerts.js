const dbapi = require("./database");

const methods = {
	addConcert: async function(funcTitle, funcDate, funcPrice) {
		const Concert = dbapi.findModelById("concert");
		const obj = { title: funcTitle, date: funcDate, price: funcPrice};
		const addedConcert = new Concert( obj );
		const concertArray = await dbapi.retrieveObjectArray(obj, "concert");
		if (concertArray.length == 0) {
			dbapi.persistObject(addedConcert);
		}
	},
};

module.exports = methods;