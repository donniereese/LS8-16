const { nanoid } = require('./lib/nanoid');

const state = {};


function SubscribeObject() {
	let _stateId;
}

SubscribeObject.prototype.id = function(newId) {
	if (!newId)
		return this._stateId;

	state[newId] = undefined;
	return newId;
}

SubscribeObject.prototype.subscribe = function() {
	  
}


const trackState = function() {
	const id = nanoid()
}

module.exports = {} 