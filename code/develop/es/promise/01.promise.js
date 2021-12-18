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
    let resolve = (success_response) => {
      if (this.state === PENDING) {
        this.state = RESOLVE;
        this.success_response = success_response;
        if (this.success_callbacks.length > 0)
          this.success_callbacks.forEach((scb) => scb());
      }
    };
    let reject = (error_reason) => {
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
    if (this.state === RESOLVE) onFulfilled(this.success_response);
    if (this.state === REJECTED) onRejected(this.error_reason);
    if (this.state === PENDING) {  // 用发布订阅模式解决异步逻辑问题
      this.success_callbacks.push(() => {
        // todo somthing
        onFulfilled(this.success_response);
      });
      this.eroor_callbacks.push(() => {
        // todo something
        onRejected(this.error_reason);
      });
    }
  }
}

new PromiseA((resolve, reject) => {
  resolve("ddd");
}).then(
  (data) => {
    console.log(data);
  },
  (err) => {
    console.log(err);
  }
);
