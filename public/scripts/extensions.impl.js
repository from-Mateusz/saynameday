"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
HTMLElement.prototype.appendChildren = function (...children) {
    for (let child of children) {
        this.appendChild(child);
    }
};
HTMLElement.prototype.leaveParent = function () {
    if (this.parentNode) {
        this.parentNode.removeChild(this);
        return this;
    }
    return null;
};
