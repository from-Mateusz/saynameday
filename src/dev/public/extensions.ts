interface HTMLElement {
    appendChildren: (...children: Node[]) => void;
    clear: () => void;
    leaveParent: () => HTMLElement | null;
}

HTMLElement.prototype.appendChildren = function(...children: Node[]): void {
    for(let child of children) {
        this.appendChild(child);
    }
}

HTMLElement.prototype.clear = function() {
    this.innerHTML = "";
}

HTMLElement.prototype.leaveParent = function() {
    if(this.parentNode) {
        this.parentNode.removeChild(this);
        return this;
    }
    return null;
}

