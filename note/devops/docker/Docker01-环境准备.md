<div align="center">
  <img
  src="https://raw.githubusercontent.com/workcjl/image_store/main/img/docker-command.png" alt="Docker环境准备"/>
  <h1 align="center">
  Docker环境准备
  </h1>
</div>

- **[检测并卸载旧版docker](#检测并卸载旧版docker)**
- **[安装必备辅助工具](#安装必备辅助工具)**
- **[配置docker阿里云镜像源](#配置docker阿里云镜像源)**
- **[下载docker](#下载docker)**
- **[启动docker](#启动docker)**
- **[查看docker版本](#查看docker版本)**
- **[测试docker](#测试docker)**
- **[卸载docker](#卸载docker)**

## 检测并卸载旧版docker

```shell
sudo yum remove docker \
                  docker-client \
                  docker-client-latest \
                  docker-common \
                  docker-latest \
                  docker-latest-logrotate \
                  docker-logrotate \
                  docker-engine
```

## 安装必备辅助工具

```shell
yum install -y yum-utils
```

## 配置docker阿里云镜像源

```shell
yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```

## 下载docker

```shell
yum install docker-ce docker-ce-cli containerd.io
```

## 启动docker

```shell
systemctl enable socker # 设置开机自启动
systemctl start docker
```

## 查看docker版本

```
docker  --version
```

## 测试docker

```shell
 docker run hello-world
```

在控制台看到如下信息，证明docker跑通了，环境准备成功！

```shell
Hello from Docker!
This message shows that your installation appears to be working correctly.

To generate this message, Docker took the following steps:
 1. The Docker client contacted the Docker daemon.
 2. The Docker daemon pulled the "hello-world" image from the Docker Hub.
    (amd64)
 3. The Docker daemon created a new container from that image which runs the
    executable that produces the output you are currently reading.
 4. The Docker daemon streamed that output to the Docker client, which sent it
    to your terminal.

To try something more ambitious, you can run an Ubuntu container with:
 $ docker run -it ubuntu bash

Share images, automate workflows, and more with a free Docker ID:
 https://hub.docker.com/

For more examples and ideas, visit:
 https://docs.docker.com/get-started/
```

## 卸载docker

```shell
# 第一步 使用yum卸载 Docker Engine、CLI 和 Containerd 包
yum remove docker-ce docker-ce-cli containerd.io
```

```shell
# 第二步 手动卸载主机上的镜像、容器、数据卷还有自定义的配置文件
# 以下命令用于删除主机上的镜像、容器、数据卷
rm -rf /var/lib/docker
rm -rf /var/lib/containerd
```

