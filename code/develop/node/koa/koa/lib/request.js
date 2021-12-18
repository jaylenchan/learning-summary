const request  = {
  get url() {
    return this.req.url // 注意了使用时是context.request.url，那this就是request，而这个request别忘了刚刚才绑定过原生的req里头就有url
  }
}

module.exports = request