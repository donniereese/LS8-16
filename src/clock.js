// Clock
class CLOCK {
    constructor(ms = 100, starting_connections = []) {
        this._speed = ms;
        this._clock = null;
        this._connections = starting_connections;
        this._connection_count = 0;
    }

    startClock() {
        // this._clock = setInterval(() => {  }, this._speed)
        this._clock = setInterval(() => { this.tick(); }, this._speed)
    }

    stopClock() {
        clearInterval(this._clock);
    }

    tick() {
        for (let i = 0; i < this._connection_count; i++) {
            switch (typeof this._connections[i]) {
                case 'function':
                    break;
                case 'object':
                    // Has Properties:
                    // 'status' property
                    break;
                case 'array':

                    break;
                default: {

                }
            }
        }
    }
}


module.exports = CLOCK;
