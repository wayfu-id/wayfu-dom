var version = "@VERSION";
var App = function App(selector, context) {
    return new App.fn.init(selector, context);
};

App.fn = App.prototype = {
    version: version,
    constructor: App,
    length: 0,
    toArray: function () {
        return Array.prototype.slice.call(this);
    },
    get: function (i) {
        if (i == null) {
            return this.toArray();
        }

        return num < 0 ? this[num + this.length] : this[num];
    },
};

App.extend = App.fn.extend = function () {};
