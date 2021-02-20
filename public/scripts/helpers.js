"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTMLElementHelper = exports.ArrayHelper = void 0;
class ArrayHelper {
    static slice(source, limit, from) {
        if (from && from > source.length) {
            throw new Error("From index is out of source bounds");
        }
        const result = [];
        let pos = 0;
        let startFrom = from ? from : 0;
        let posLimit = startFrom + limit;
        for (let elem of source) {
            if (pos >= startFrom && pos < posLimit) {
                result.push(elem);
            }
            pos++;
        }
        return result;
    }
}
exports.ArrayHelper = ArrayHelper;
class HTMLElementHelper {
}
exports.HTMLElementHelper = HTMLElementHelper;
HTMLElementHelper.appendChildren = function (target, ...children) {
    for (let child of children) {
        target.appendChild(child);
    }
};
HTMLElementHelper.leaveParent = function (source) {
    if (source.parentNode) {
        source.parentNode.removeChild(source);
        return source;
    }
    return null;
};
HTMLElementHelper.clear = function (source) {
    source.innerHTML = "";
};
