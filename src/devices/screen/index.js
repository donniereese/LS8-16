const server = require('./server.js');

class DisplayDevice {
	constructor() {
		this.server = server;
	}
}

module.exports = DisplayDevice;