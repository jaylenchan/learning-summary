const PENDING = "PENDING"; // 未完成
const RESOLVE = "RESOLVE"; // 已完成
const REJECTED = "REJECTED"; // 已失败
const resolvePromise = (promise2, x, resolve, reject) => {
   if(promise2 === x) throw new Error('chain circle detected for promise')
   if(typeof x === object && x !== null) {
     try{  
      const then = x.then 
      if(typeof then === 'function'){ // 直接认为是一个promise

      }else {
        resolve(x)
      }
     }catch(err){
       reject(err)
     }
   }else {
     resolve(x)
   }
};
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
    let p2 = new PromiseA((resolve, reject) => {
      if (this.state === RESOLVE) {
        setTimeout(() => {
          const res = onFulfilled(this.success_response);
          resolvePromise(p2, res, resolve, reject);
        }, 0);
      }
      if (this.state === REJECTED) {
        setTimeout(() => {
          const err = onRejected(this.error_reason);
          resolvePromise(p2, err, resolve, reject);
        }, 0);
      }
      if (this.state === PENDING) {
        // 用发布订阅模式解决异步逻辑问题
        this.success_callbacks.push(() => {
          setTimeout(() => {
            const res = onFulfilled(this.success_response);
            resolvePromise(p2, res, resolve, reject);
          }, 0);
        });
        this.eroor_callbacks.push(() => {
          setTimeout(() => {
            const err = onRejected(this.error_reason);
            resolvePromise(p2, err, resolve, reject);
          }, 0);
        });
      }
    });
    return p2;
  }
}

const p1 = new PromiseA((resolve, reject) => {
  resolve("1");
});
const p2 = p1.then(
  (data) => p2,
  (err) => err
);
p2.then((res) => console.log(res), (err) => {

});
