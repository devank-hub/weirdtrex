//@ts-ignore
Array.prototype.group = function(num: number): object[]{
    let arr = this;
    let newArray = [];
    while(arr.length != 0){
        newArray.push([...arr.slice(0, (arr.length) >= num ? num : arr.length)])
        arr = arr.slice(num)
    }
   return newArray
}