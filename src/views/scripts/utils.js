/**
 *  More helfpul implementation of slice function for my case.
 *  I want to slice array with upper treshold of elements fetched from array.
 *  If array's length is 5 and from index is set to 3 and limit is set to 3,
 *  function will not try to extract 3 elements but only 2, because there's only
 *  2 elements left.
*/
function sliceBetter(src, from, limit) {
    if(from > src.length) {
      throw new Error("From index is out of source array's index bounds");
    }
  
    const arr = [];
    let pos = 0;
    let posLimit = from + limit;
      for(let elem of src) {
      if(pos >= from && pos < posLimit) {
        arr.push(elem);
      }
      pos++;
    }
    return arr;
  }