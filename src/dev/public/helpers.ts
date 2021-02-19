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

