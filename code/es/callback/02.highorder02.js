const isType = (type, value) => {
  type = type.slice(0, 1).toUpperCase() + type.slice(1);
  return Object.prototype.toString.call(value) === `[object ${type}]`;
};

const curry = (fn, arr=[]) => {
  return (...args) => {
    arr = arr.concat(args)
    if(arr.length < fn.length){
      return curry(fn, arr)
    }else {
      return fn(...arr)
    }
  };
};
// const isArray = curry(isType)('array')
// const re = isArray('')
// console.log(re)
let sum = (a,b,c) => {
  return a+b+c
}
sum = curry(sum)(1)
console.log(sum(2)(3))


