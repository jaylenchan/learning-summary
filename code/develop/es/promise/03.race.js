const fs = require("fs").promises;
const { resolve } = require("path");
const isPromise = (v) => typeof v.then === "function";

Promise.race = function (arr) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < arr.length; i++) {
      const task = arr[i]
      if(isPromise(task)){
        task.then(resolve, reject)
      }else{
        resolve(task)
      }
    }
  });
};

Promise.race([
  fs.readFile(resolve(__dirname, "name.txt"), "utf-8"),
  fs.readFile(resolve(__dirname, "age.txt"), "utf-8"),
]).then((res) => {
  console.log(res);
});
