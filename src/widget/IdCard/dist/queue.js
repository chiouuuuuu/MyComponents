"use strict";
exports.__esModule = true;
var Queue = /** @class */ (function () {
    function Queue() {
        var _this = this;
        this.queue = [];
        this.enqueue = function (item) {
            _this.queue.push(item);
        };
        this.dequeue = function () {
            return _this.queue.shift();
        };
        this.size = function () {
            return _this.queue.length;
        };
        this.isEmpty = function () {
            return !_this.queue.length;
        };
        this.clear = function () {
            _this.queue = [];
        };
    }
    return Queue;
}());
exports["default"] = new Queue();
