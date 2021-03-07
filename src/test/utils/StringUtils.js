"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StringUtils {
    static isNotEmpty(text) {
        return undefined !== text && text.trim() !== "";
    }
}
exports.default = StringUtils;
