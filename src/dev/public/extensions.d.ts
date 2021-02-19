declare global {
    export interface Element {
        appendChildren: (...children: Node[]) => void;
    }
    
    export interface HTMLElement {
        appendChildren: (...children: Node[]) => void;
        clear: () => void;
        leaveParent: () => HTMLElement | null;
    }
}

Element.prototype.appendChildren = function(...children: Node[]): void {
    for(let child of children) {
        this.appendChild(child);
    }
}

HTMLElement.prototype.appendChildren = Element.prototype.appendChildren;

HTMLElement.prototype.clear = function() {
    this.innerHTML = "";
}

HTMLElement.prototype.leaveParent = function() {
    if(this.parentNode) {
        this.parentNode.removeChild(this);
        return this;
    }
    return null;
};

export {};

