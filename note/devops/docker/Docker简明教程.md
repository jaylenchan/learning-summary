<div align="center">
  <img
  src="https://raw.githubusercontent.com/workcjl/image_store/main/img/docker-command.png" alt="Docker Tutorial"/>
  <img
   src="https://github.com/jaylenchan/learning-summary/blob/main/pic/docker-%E5%BC%80%E5%8F%91%E6%B5%81%E7%A8%8B%E5%9B%BE.png?raw=true"
   alt="Docker Dev Process"
  />
  <h1 align="center">
  Docker简明教程
  </h1>
</div>

Docker 是一个用于开发、传送和运行应用程序的开放平台。Docker 使您能够将应用程序与基础设施分开，以便您可以快速交付软件。使用 Docker，您可以像管理应用程序一样管理基础设施。通过利用 Docker 的快速交付、测试和部署代码的方法，您可以显着减少编写代码和在生产中运行代码之间的延迟。

- **[概述](#概述)**
- **[Docker组成](#Docker组成)**

## 概述

---

实际开发当中一个常见的问题就是环境统一的问题，因为开发环境、测试环境、生产环境不一致，就可能导致某一些bug很难在开发环境当中被及时发现，使用Docker我们就可以保证我们开发的应用在各个环境统一，不会再出现”这个在我的电脑上跑起来是没问题的啊“的问题。

同时，使用Docker定制我们的镜像，我们可以很容易实现CICD。开发人员通过Dockerfile来进行镜像的构建，通过CICD系统集成测试后，运维人员就可以直接在生产环境当中快速的部署该镜像。而且使用Dockerfile使得镜像透明化，不仅开发可以理解应用，运维也可以理解。

## Docker组成

---

![](https://raw.githubusercontent.com/workcjl/image_store/main/img/docker-components.png)

### Docker 镜像

镜像是一个特殊的文件系统，除了提供容器运行时所需要的程序、库、资源、配置等文件外，还包含了一些为**运行时**准备的配置参数，比如说：匿名卷、环境变量、用户。镜像是不包含任何动态数据的，镜像里头的内容在构建后也是不会变的。Docker镜像是一层层叠加起来的，是一组组文件系统叠加起来的产物。分层存储的特征使得定制镜像变得容易，我们可以使用构建好的镜像作为基础层，然后添加新的层，定制属于我们的新镜像。

### Docker 容器

容器是一个特殊的进程，跟普通进程不一样的是，容器具有自己的命名空间。所以容器可以有自己的root文件系统、网络配置、进程空间、用户ID空间。每一个容器运行的时候，是以镜像作为基础层，然后在这上边创建一个当前容器的存储层，这个存储层是为容器运行时读写用的。但是这个存储层会在容器销毁的时候跟着销毁，所以不能做数据的持久化。如果要做数据的持久化，我们应该使用Volume数据卷挂载，或者挂载到宿主机目录上去，在这些位置的读写，就会跳过容器的存储层，直接对宿主机发生读写的操作。

### Docker 仓库

镜像在本地构建完成以后，如果想要跟别人共享，还需要一个镜像仓库，Docker仓库就是存储镜像的地方。有了Docker仓库，我们就可以将镜像放到仓库上，需要的时候再从仓库拿镜像，十分方便。

## 镜像操作

---

学习Docker镜像的操作，实际上就是使用Docker客户端进行镜像操作的命令学习。首先，我们可能会需要从镜像仓库拿一份镜像到本地用，在Docker中就使用`docker pull`操作来实现从远程的镜像仓库上拿自己想要的镜像到本地来用。具体的操作是`docker pull Docker仓库地址/镜像仓库名:镜像标签`。当把一个镜像从远程的镜像仓库取下来之后，我们可能就会想要查看一下docker中的镜像有哪些，于是我们可以使用`docker images`去查看当前本地有多少个镜像。

<https://blog.csdn.net/qianghaohao/article/details/87554255>

## 容器操作

---

![docker-life-cycle](https://raw.githubusercontent.com/workcjl/image_store/main/img/docker-life-cycle.jpg)
