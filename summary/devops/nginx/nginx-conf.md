# conf

`nginx.conf`默认有三大块：全局块、events块、http块。

## 全局块

### user指令

指定user，可以让整个nginx在使用过程当中变成某个user角色，可以对所有该角色有权限的文件进行访问。但是不能越权访问，比如说：你给定义一个www的角色，你却想要访问root目录下的东西，这是不可能的，会报403权限错误。

### master_process指令

指定是否开启master-worker进程的工作模式。默认是on。配置语法：`master_process on;`或者`master_process off;`

### worker_processes指令

当开启master-worker进程工作模式的时候，使用这个指令来指定要开启多少个worker进程。理论上来说，如果这个值开启的越大，也就是worker的数量越多，可以处理的并发请求就会越多。一般建议将这个数值配置成服务器CPU的内核数保持一致即可。配置语法：`worker_processes 2;`。

### daemon指令

指定nginx这个服务器是否以守护进程的方式启动。也就是说，是否是在后台启动着，而不是在当前的终端启动，然后随着终端的关闭而销毁。nginx启动默认这个配置就是开启的，也就是nginx服务器默认是守护进程的方式启动的。配置语法：`daemon on;`或者`daemon off;`。

### pid指令

指定nginx的master进程的进程号要存储到哪一个文件中。配置语法`pid 文件路径;`。一般是`/usr/local/nginx/logs/nginx.pid`。

### error_log 指令

指定nginx错误要存放到哪一个文件当中。配置语法：`error_log 文件路径;`。一般是在`/usr/local/nginx/logs/error.log`当中。

### include指令

用来引入其他的配置文件，分隔代码块。让nginx的配置更加的灵活。

## events块

### accept_mutex指令

设置nginx网络连接序列化的功能。
配置语法：`accept_mutex on;`或者`accept_mutext off;`。

### multi_accept指令

设置nginx的worker进程是否允许同时接收多个网络连接。配置语法：`multi_accept on(off);`。如果这个指令关闭，那么nginx的一个worker进程就只能同时接受最多1个的网络新连接。否则可以接收所有的新连接。（实际开发，应该是打开的这个值）

### worker-connections指令

用来设置一个worker进程最大的连接数是多少。这个值的上限跟系统有关，不可以大过系统支持打开的最大文件句柄数量。（注意：这里的连接数指的不仅仅是和前端之间的连接数，是包括所有可能的连接数）。配置语法：`worker_connections  number;`

### use指令

用来设置nginx服务器要使用哪一种事件驱动来处理网络消息。配置语法：`use method;`

## http块

### MIME-Type

浏览器可以展示HTML、GIF、IMAGE很多种类的资源。为了区分这些资源，浏览器就需要使用MIME- Type来区分，MIME-Type是网络资源的媒体类型。而nginx作为响应前端的服务器，也需要能够识别前端请求的这些资源类型。在nginx.conf文件当中，默认就有两行配置用类设置MIMI-Type

```?nginx
http{
  include mime.types;
  default-type application/octet-stream;
}
```

### default-type指令

用来配置nginx响应前端请求的默认资源类型。配置语法`default-type 资源类型`

### 自定义服务日志

`access.log`是用来记录一个用户访问nginx的所有的访问请求的。
`error.log`是用来记录nginx本身运行的时候出现的错误信息，它是不会去记录用户的访问信息的。
我们可以使用`access_log`指令来配置用户访问日志的属性。`access_log`指令可以在http块以及server块和 location块中进行配置。然后除此之外，我们可以使用`log_format`来配置日志输出的格式。`log_format`块只能在http块中配置。

### sendfile指令

用来配置nginx服务器是否使用sendfile这个函数去处理文件的传输。不经过用户内核发送文件。配置语法：`sendfile on(off)`。开发建议打开这个选项。

### keepalive_timeout指令

HTTP是一种没有状态的协议。客户端发送http请求给服务端，服务端返回响应后，一次请求就完成了。于是在不做任何其他操作下整个连接就算断开了。等下次客户端再次发起http请求的时候，再重新创建一个新的连接。为了一直保持着连接，我们可以使用keepalive去解决这个问题。但是呢，这个连接也不能一直保持着，因为如果连接过多，服务器的性能也会下降，这种时候，就需要我们去设置超时的时间，让这个连接能够断开。keepalive_timeout指令就是做这件事情的。

配置语法：`keepalive_timeout time`举例子：`keepalive_timeout 75s`。

### keepalive_requests指令

用来配置1次keep-alive长连接可以允许接收的请求最多多少次。超过这个次数，长连接断开。

### server块

用来配置服务器

### location块
