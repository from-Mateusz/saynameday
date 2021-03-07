"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PolishDiacriticalMarksUtil {
    simplify(text) {
        let simplerText = text;
        if (text.indexOf("ł")) {
            simplerText = simplerText.replace("ł", "l");
        }
        return simplerText;
    }
}
class DiacriticalMarksUtilFactory {
    static polish() {
        return new PolishDiacriticalMarksUtil();
    }
}
exports.default = DiacriticalMarksUtilFactory;
