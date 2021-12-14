#! 
const PENDING = "PENDING"; // 未完成
const RESOLVE = "RESOLVE"; // 已完成
const REJECTED = "REJECTED"; // 已失败

class PromiseA {
  constructor(executor) {
    this.state = PENDING;
    this.success_response = undefined;
    this.error_reason = undefined;
    this.success_callbacks = [];
    this.eroor_callbacks = [];
    const resolve = (success_response) => {
      if (this.state === PENDING) {
        this.state = RESOLVE;
        this.success_response = success_response;
        if (this.success_callbacks.length > 0)
          this.success_callbacks.forEach((scb) => scb());
      }
    };
    const reject = (error_reason) => {
      if (this.state === PENDING) {
        this.state = REJECTED;
        this.error_reason = error_reason;
        if (this.eroor_callbacks.length > 0)
          this.eroor_callbacks.forEach((ecb) => ecb());
      }
    };
    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onFulfilled, onRejected) {
    let p2 = new PromiseA((resolve, reject) => {
      if (this.state === RESOLVE) {
       const res = onFulfilled(this.success_response);
       resolve(res)
      }
      if (this.state === REJECTED) {
        const err = onRejected(this.error_reason);
        reject(err)
      }
      if (this.state === PENDING) {
        // 用发布订阅模式解决异步逻辑问题
        this.success_callbacks.push(() => {
          // todo somthing
           const  res = onFulfilled(this.success_response);
          resolve(res)
        });
        this.eroor_callbacks.push(() => {
          // todo something
          const err = onRejected(this.error_reason);
          reject(err)
        });
      }
    });
    return p2;
  }
}

const p1 = new PromiseA((resolve, reject) => {
  resolve('1')
})
const p2 = p1.then(data=> data, err => err)
p2.then(res => console.log(res))

