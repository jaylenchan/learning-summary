![Docker Architecture Diagram](https://raw.githubusercontent.com/workcjl/image_store/main/img/docker-architecture.svg)

# 环境搭建

## 配置Docker环境

### 安装Docker

```shell
1.# 卸载旧的docker环境
yum remove docker \
docker-client \
docker-client-latest \
docker-common \
docker-latest \
docker-latest-logrotate \
docker-logrotate \
docker-engine

2.# 配置docker安装源
yum install -y yum-utils
yum-config-manager \
    --add-repo \
    http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
    
（通过yum-config-manager添加的repo在/etc/yum.repos.d可以查看到）
    
3.# 安装docker engine
yum install docker-ce docker-ce-cli containerd.io

4.# 启动docker
systemctl start docker

5.# 测试docker engine是否安装成功
docker run hello-world

6.# 卸载docker engine
## 卸载主要工具
yum remove docker-ce docker-ce-cli containerd.io
## 卸载数据文件
rm -rf /var/lib/docker
rm -rf /var/lib/containerd

7.# 配置docker开机启动服务
systemctl enable docker.service
systemctl enable containerd.service
```

## 配置Docker-Compose环境

```shell
1.# 下载docker-compose
curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

2.# 给docker-compose添加执行权限
chmod +x /usr/local/bin/docker-compose

3.# 测试docker-compose是否安装成功
docker-compose --version

4.# 卸载docker-compose(只适合curl安装方式)
rm /usr/local/bin/docker-compose
```



## 容器<=>文件

```shell
docker export -o  文件
docker import 文件
```

## 镜像<=>文件

```shell
docker save -o
docker load -i
```

## 传递环境变量

```shell
docker container run -it -e name="chen" centos /bin/bash
```

## 查看容器端口映射

```shell
docker container port 容器
```

## 进入容器里头

```shell
docker container exec -it 容器 /bin/bash
```

## 查看容器日志

```shell
docker container logs 容器
```

## 强行停止容器

```shell
docker container kill 容器
```

## 容器文件<=>宿主机文件

```shell
docker container cp 容器:文件路径 宿主机文件路径
```

## 制作镜像

创建`Dockerfile`

```dockerfile
FROM node /** 基于node构建镜像，node镜像也是基于centos的*/
COPY ./app /app  /** 将Dockerfile所在的当前项目的app文件直接拷贝到镜像中/app路径下*/
WORKDIR /app /** 进入到镜像里头的/app路径*/
RUN npm install /** 执行npm install构建镜像里头的项目*/
EXPOSE 3000 /** 暴露3000端口*/
```

创建镜像

```shell
docker build -t 镜像名字 . /** 这个点说明的是Dockerfile的工作地方，会去这个地方找Dockerfile*/
```



启动容器

```shell
docker container create --name node_container 镜像名字
```



## 创建数据卷

```shell
docker volume create 数据卷名字
```

创建的数据卷想要查看具体的信息，可以使用

```shell
docker volume inspect 数据卷名字
```

一般新创建的数据卷的信息就放在`/var/lib/docker/volumes/数据卷名字/_data`下边。在我们使用

```shell
docker container run -p 80:80 -d -v 数据卷名字:/usr/share/nginx/html --name="nginx"  nginx镜像名字
```

通过 `-v 数据卷名字:docker容器某个目录` 就可以让docker容器内那个目录的东西直接绑定到了数据卷上。但是这样做只能固定在这个数据卷上，如果想要绑定到任意目录，我们需要使用另外一种方式

```shell
docker container run -p 80:80 -d -v 宿主机任意目录的绝对路径:docker容器你想要挂载的任意一个目录 --name="nginx" nginx镜像名字
```

## 提供数据挂载策略

我们可以创建一个docker容器，指定数据卷挂载，但是不启动它

```shell
docker create -v /logger:/logger --name logger nginx
```

我们创建了logger的容器，但是没有启动它，只是将它里头的/logger挂载到宿主机的/logger目录上。

接着我们正式创建运行的容器，让他继承logger容器

```
docker run --volume-from logger -it /bin/bash --name logger1
```

## Docker网络

经常我们需要部署不同的容器，每种容器需要跑不同的服务。比如mysql和node服务器两种服务，此时node服务的容器需要跟mysql的服务容器发生请求，这时候需要知道Docker网络相关的内容才行。

```shell
docker network ls /** 查看docker网络*/
```

查看一下哪些容器属于桥连的方式

```shell
docker network inspect bridge
```

docker容器默认不指定直接启动的话，是桥连的网络。

我们随便进去一个容器

```shell
docker container exec -it xxx /bin/bash
```

进去之后，我们ping跟容器在一个网段的其他容器，发现ping是没有的，这是因为docker是能省就省略，为了体积小。所以我们需要安装一下inetutils-ping这个工具，让我们能够使用ping命令。

我们安装完成后去ping同网段容器，就可以ping成功了。但是由于docker容器的ip是基于DHCP的动态ip分配的，所以不固定。我们希望做到能够使用nginx1容器名的方式,ping nginx1的方式去ping通，于是我们可以如下那么做：

```shell
docker container run  -d --link nginx1 --name nginx2 
```

加上--link nginx1之后，nginx2容器就加入了nginx1的网段的同时，可以使用PIng nginx去ping了。原理其实就是对于nginx1增加一个与nginx1自己的ip的host 映射而已。

## 自定义网络

自定义网络内部自带一个DNS服务器，让我们可以直接使用ping 同网段的容器名字的方式去ping。而不用在启动容器的时候去指定--link nginx1这样子。只需要

```shell
docker network create fi_net /** 创建自定义网络fi_net*/
```

然后启动容器加入这个网络就好了

```shell
docker container run -d --net fi_net --name nginx1 nginx
```

我们还可以将某一个在别的网段的容器重新指定到某个网络内

```shell
docker network connect fi_net nginx2
```

## 容器编排

工程上，常常是一个服务对应一个容器，而这些服务我们还需要根据服务的功能有选择的按顺序去启动容器，我们不太可能不安顺序去启动。比如web容器需要api服务的容器。如果先启动web需要请求api的时候找不到服务器，就直接挂了。所以编排容器启动是很重要的。我们需要用到docker-compose去帮我们编排容器。

```
yum install  -y epel-release
yum install -y python-pip
```

```shell
aa存在 bb不存在 cc存在
cp -R aa bb
```

问：意思是把aa目录拷贝到bb目录下面吗？
答：不是的。结果是直接将aa复制一份，然后改名字成bb。`bb/xx`

```shell
cp -R aa cc
```

意思是把aa整个目录内容拷贝到cc目录下边，因为cc目录是存在的。所以会在cc里面有一个aa目录. `cc/aa/xx`

写Dockerfile

```dockerfile
FROM node
MAINTAINER chenjialiang
COPY web /web /** 这个意思就是cp -R aa bb的例子的意思，就是镜像里头是没有/web的，其实就是复制web一份，然后改名成/web*/
RUN npm install /** 意思是构建镜像的时候安装依赖包*/
CMD npm start /** 意思是在运行容器的时候启动这个命令*/
```

写docker-compose.yaml

```dockerfile
version: "2"
services:
  db:
    image: mariadb
    environment:
      MYSQL_ROOT_PASSWORD: "123456"
      MYSQL_DATABASE: "node_app"
      MYSQL_USER: "zhufeng"
      MYSQL_PASSWORD: "123456"
    volumes: 
      - db_data:/var/lib/mysql
  web:
    image: nginx
    ports:
      - "8080:80"
    volumes:
      - "./images/nginx/conf:/etc/nginx/conf.d"
      - "./images/nginx/public:/usr/share/nginx/html"
    depends_on:
      node
  node:
    build:
      context: "./image/node"
      dockerfile: Dockerfile
    depends_on: 
      - db
volumes:
  db_data:
    driver: local
```

```


connection.end();
```

## Dockerfile

```
COPY
exec格式
shell格式
```

```
ENV 设置环境变量
ENV <key> <val>
ENV <key>=<val>
```

```
ARG 设置环境变量
ARG <key>=<val>

```

```
VOLUME 存储卷

```

```
ONBUILD 配合基础镜像使用
```

```
LABEL 标签，可以说明一些镜像信息
```

```
构建镜像的阶段，如果只是想构建多阶段的其中一个阶段的时候，那么可以在构建的时候，加上--target=xxx
docker build --target=builder -t 镜像名字 .
```

```shell
# docker中jenkins安装报错
java.security.cert.CertificateNotYetValidException: NotBefore
# 问题解决
将宿主机linux的时区时钟校准
yum install chrony -y
ln -snf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
bash -c "echo 'Asia/Shanghai' > /etc/timezone"
## 统一使用阿里服务器进行时间更新
vim /etc/chrony.conf
pool ntp1.aliyun.com iburst # 修改第一行为这个

## 系统后台自启动时间更新服务
systemctl enable chronyd
systemctl start chronyd
```

docker问题

```shell
Release file for http://security.debian.org/debian-security/dists/bullseye-security/InRelease is not valid yet (invalid for another 1d 15h 29min 57s). Updates for this repository will not be applied.
# 解决方式：同步时钟的问题
```



### Dockerfile最佳实践

