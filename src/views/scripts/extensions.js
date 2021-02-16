Node.prototype.appendChildren = function(...children){
    for(let child of children) {
        if(child instanceof Node) {
            this.appendChild(child);
        }
    }
}