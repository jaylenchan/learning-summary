# docker运行原理

Docker是一个client-server结构的系统，Docker的守护进程运行在主机上，通过socket从客户端进行访问。用户在docker-client使用docker-cli发出docker命令，docker-server接收到用户发过来的命令过后，就会执行这条命令。

![img](https://github.com/jaylenchan/learning-summary/blob/main/pic/docker-%E8%BF%90%E8%A1%8C%E5%8E%9F%E7%90%86.png?raw=true)

docker之所以比虚拟机快，是因为docker比虚拟机拥有着更少的抽象层。

![img](https://github.com/jaylenchan/learning-summary/blob/main/pic/docker-vm%E5%92%8Cdocker%E5%AF%B9%E6%AF%94.png?raw=true)

docker利用的是宿主机的内核，vm需要的是Guest OS。所以说，新建一个docker容器，并不需要像新建一个虚拟机一样，重新加载一个操作系统内核。
