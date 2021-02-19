import { randomBytes } from "crypto";

export class ArrayHelper {
    static slice(source: any[], limit: number, from?: number): any[] {
        if(from && from > source.length) {
            throw new Error("From index is out of source bounds");
        }

        const result = [];
        let pos = 0;
        let startFrom = from ? from : 0;
        let posLimit = startFrom + limit;
          for(let elem of source) {
            if(pos >= startFrom && pos < posLimit) {
                result.push(elem);
            }
          pos++;
        }
        return result;
    }
}

export class HTMLElementHelper {
  static appendChildren = function(target: Node, ...children: Node[]): void {
    for(let child of children) {
        target.appendChild(child);
    }
  }

  static leaveParent = function(source: Node) {
    if(source.parentNode) {
        source.parentNode.removeChild(source);
        return source;
    }
    return null;
  };

  static clear = function(source: HTMLElement) {
    source.innerHTML = "";
  }
}

