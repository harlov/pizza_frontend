const EVENT_ACTIVE_CART_UPDATED="active_cart_updated";

const EventsEmitter = {
    events: [],
    dispatch: function (event, data) {
        if (!this.events[event]) return;
        this.events[event].forEach(callback => callback(data))
    },
    subscribe: function (event, callback) {
        if (!this.events[event]) this.events[event] = [];
        this.events[event].push(callback);
        console.log(this.events);
    }
};

export default {EventsEmitter, EVENT_ACTIVE_CART_UPDATED}
