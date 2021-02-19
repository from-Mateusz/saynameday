"use strict";
HTMLElement.prototype.appendChildren = function (...children) {
    for (let child of children) {
        this.appendChild(child);
    }
};
HTMLElement.prototype.clear = function () {
    this.innerHTML = "";
};
HTMLElement.prototype.leaveParent = function () {
    if (this.parentNode) {
        this.parentNode.removeChild(this);
        return this;
    }
    return null;
};
