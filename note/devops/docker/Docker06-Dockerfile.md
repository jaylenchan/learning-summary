<div align="center">
  <img
  src="https://raw.githubusercontent.com/workcjl/image_store/main/img/dockerfile.png" alt="RBAC Tutorial"/>
  <h1 align="center">
  Dockerfile简明教程
  </h1>
</div>

如果你想要自己做一个Docker镜像，那么你可以有两种方法去制作一个自己的镜像。一种方式是利用Docker命令`docker commit`，而另外一种更好的方式就是使用Dockerfile文件。Docker引擎它认识Dockerfile，可以读取Dockerfile文件中的一行行的指令，来帮助你去构建镜像。

- **[概述](#概述)**
- **[指令详解](#指令详解)**
- **[实例](#实例)**
- **[指令表](#指令表)**

## 概述

---

使用Dockerfile就好像写一份菜谱一样，我们想要特朗普知道怎么样去炒一道小鸡炖蘑菇，我们首先将小鸡炖蘑菇的制作流程写出来成为一份菜谱，特朗普拿到菜谱之后就知道如何去制作一道小鸡炖蘑菇了。Dockerfile本质上就是一个文本文件，我们可以在Dockerfile文件上一行行写好如何去构建我们想要的镜像，然后交给Docker引擎去按照我们在Dockerfile上要求的做法去构建我们的镜像。

## 指令详解

---

Dockerfile中的一条指令构建一层镜像，所以说一定只添加必要的东西，同时不要去添加一些没有意义的层，能写在一层，也就是写在一条指令当中，就尽量写在一条指令当中。

### USER

USER它定义了Docker里头是以什么用户操作的

### WORKDIR

WORKDIR它告诉了你当你进入Docker容器的时候会到哪一个目录去

### EXPOSE

EXPOSE它告诉了你容器当中哪一个端口需要被暴露出来。这个指令常常是给-P用的，如果使用-p port:containerPort那么指令并没有生效

### ADD

ADD它告诉了你要把本地的哪一个文件/目录拷贝到Docker容器当中的哪个位置去

### ENV

ENV它定义了Dockerfile的变量，同时也可以定义成Docker容器内部的环境变量。环境变量就像是你在Linux系统中的shell终端输入env打出来的那一堆东西，同样的你可以在Docker里面使用在Dockerfile上定义的环境变量

### RUN

RUN告诉了你，可以在Docker构建镜像的时候去执行shell命令。这个指令所执行的操作都会封装到镜像上，也就是固化到了只读层。

### CMD

CMD告诉了你，可以在Docker容器运行的时候去执行shell命令，即可以在`docker run`一个容器启动以后执行CMD的内容，而不是使用`/bin/bash`这条命令去执行内容（就是`docker run -d -it xx /bin/bash`）

ENTRYPOINT

ENTRYPOINT告诉了你，每一个Docker容器都有一个默认的启动命令，即执行Docker容器里头的`/entrypoint.sh`脚本

## 理解docker build

---

docker本质是一套C/S架构的平台，我们的所有操作都是docker客户端调用API操作docker服务器的方式。因此对于`docker build -t myapp:v1.0 .`这条命令也是不例外的。

```shell
myapp
├── Dockerfile
├── myapp.txt
└── src
    └── src.txt
```

`docker build -t myapp:v1.0 .`实际上的工作过程是：指定要打包给docker服务器的文件夹路径，这里指定的就是当前目录`.`，也就是myapp这个文件夹。于是docker就在客户端打包这个文件夹，然后发送给docker服务器。docker服务器接收到该文件夹之后，就解压这个文件夹，然后会默认在这个文件夹下搜索Dockerfile这个文件去进行镜像的构建。

在Dockerfile里头，我们写的路径都是相对于我们在客户端写`docker build -t myapp:v1.0 .`指定的上下文所在的目录。所以如果写的路径所对应的文件在指定的这个目录当中是不存在的，那么docker是会报错的。

如果Dockerfile不在我们指定的上下文当中，那么我们可以显示去指定`docker build -t myapp:v1.0 . -f ../Dockerfile`。此时执行这条命令的时候我们是进入到了`myapp/src`下，指定这个目录是上下文，然后Dockerfile在上一层目录当中。

## 指令表

|     指令     |                             作用                             |
| :----------: | :----------------------------------------------------------: |
|    `FROM`    |             当前镜像是基于什么基础镜像开始构建的             |
|    `RUN`     | 构建当前镜像的时候想要执行什么指令（可以给一些基础镜像增加一些工具） |
|   `EXPOSE`   | 当前镜像以后启动的容器要暴露哪个端口（只有暴露了，才能够在以后去映射） |
|  `WORKDIR`   | 当前镜像以后要启动的容器在进入容器后的目录首先是谁（即`docker exec -it 容器 /bin/bash`进去后第一个看到的目录是哪个地方）这个指令可以指定一个绝对路径，也可以是一个相对路径。如果是一个相对路径的话，这个相对路径是相对于之前的WORKDIR的路径的。 |
|    `ENV`     | 用来在构建镜像过程中设置环境变量（这样子就可以在下边阶段的指令中去使用环境变量了） |
|    `ADD`     | 用来把宿主机下的文件拷贝到镜像里头(不仅仅是拷贝，功能更强大，如果是压缩文件，还会自动帮你解压缩放入镜像) |
|    `COPY`    |   用来把宿主机下的文件拷贝到镜像里头(仅仅是拷贝，啥都不干)   |
|   `VOLUME`   |                  容器数据卷，用于数据持久化                  |
|    `CMD`     | 指定一个容器在启动的时候要运行什么命令（可以写无数个，但只有1个CMD会生效，所以写多没卵用，CMD会被`docker run`之后的参数替换掉）比如`docker run xxx ls /data`就会把CMD的命令替换成启动时执行`ls /data` |
| `ENTRYPOINT` |            指定一个容器在启动的时候要运行什么命令            |