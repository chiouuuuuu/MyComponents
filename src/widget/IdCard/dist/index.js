"use strict";
exports.__esModule = true;
var antd_1 = require("antd");
var react_1 = require("react");
var queue_1 = require("./queue");
var index_module_less_1 = require("./index.module.less");
function IDCard() {
    var _a = react_1.useState('xxxxxx / xxxxxx / xxxxxx'), placeholder = _a[0], setPlaceholder = _a[1];
    var separators = react_1.useState(' / ')[0];
    var _b = react_1.useState(''), value = _b[0], setValue = _b[1];
    var handleInput = react_1.useCallback(function (e) {
        var splitValue = [];
        if (separators.includes(e.target.value)) {
            splitValue = e.target.value.split('');
        }
        else {
            splitValue = e.target.value.split(' / ').join('').split('');
        }
        splitValue.forEach(function (v) { return queue_1["default"].enqueue(v); });
        var temp = [];
        var result = [];
        var size = queue_1["default"].size();
        var value = '';
        var hasChanged = false;
        placeholder.split(separators).forEach(function (v) {
            temp = v.split('').map(function (_) {
                if (!queue_1["default"].isEmpty()) {
                    return queue_1["default"].dequeue();
                }
                return 'x';
            });
            // 设置placeholder
            result.push(temp.join(''));
            // 设置value
            for (var i = 0; i < Math.min(size, 6); i++) {
                value += temp[i];
            }
            size -= 6;
            if (size % 6 !== 0 && e.target.value !== '' && !hasChanged) {
                value += ' / ';
                hasChanged = true;
            }
        });
        setValue(value);
        setPlaceholder(result.join(separators));
        queue_1["default"].clear();
    }, [placeholder, separators]);
    return (React.createElement("div", { className: index_module_less_1["default"].container },
        React.createElement("div", { className: index_module_less_1["default"].placeholder },
            React.createElement("span", null, placeholder)),
        React.createElement(antd_1.Input, { value: value, onChange: handleInput })));
}
exports["default"] = IDCard;
