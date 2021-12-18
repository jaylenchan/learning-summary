/*
 * promise解决的问题
 * 回调嵌套的问题
 * 同步多个异步请求的结果
 */

const fs = require("fs").promises;
const { resolve } = require("path");
const isPromise = (v) => typeof v.then === "function";
Promise.all = function (arr) {
  return new Promise((resolve, reject) => {
    const res = [];
    let count = 0;
    const processData = (data) => {
       res[count] = data
       if(++count === arr.length) {
          resolve(res)
       } 
    };

    for (let i = 0; i < arr.length; i++) {
      const task = arr[i];
      if (isPromise(task)) {
        task.then((data) => {
          processData(data);
        }, reject);
      } else {
        res[i] = task;
      }
    }
  });
};
Promise.all([
  fs.readFile(resolve(__dirname, "name.txt"), "utf-8"),
  fs.readFile(resolve(__dirname, "age.txt"), "utf-8"),
]).then((res) => {
  console.log(res);
});
