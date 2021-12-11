const jsBridge = {
  /**
   * 在前端调用: 注册给客户端用的JS方法 - 注册到哪里去？注册到了messageHandlers中
   * 注册完毕之后，客户端那边就可以通过这个jsBridge使用前端注册的方法
   */
  registerHandler() {},
  /**
   * 在客户端调用：调用在前端注册的方法 - 也就是在registerHandler注册的方法
   */
  _handleMessageFromNative() {},
  /**
   * 在前端调用：调用客户端给我们注册的api
   */
  callHandler() {
    const createUri = () => {
      //url scheme的格式如
      //基本有用信息就是后面的callbackId,handlerName与data
      //原生捕获到这个scheme后会进行分析
      const CUSTOM_PROTOCOL_SCHEME = "js";
      const uri = `${CUSTOM_PROTOCOL_SCHEME}://API_Name:callbackId/handlerName?data`;
      return uri;
    };
    const createRequest = (uri: string) => {
      var messagingIframe = document.createElement("iframe");
      messagingIframe.style.display = "none";
      document.documentElement.appendChild(messagingIframe);
      messagingIframe.src = uri;
    };
    const uri = createUri();
    createRequest(uri);
  },
};
