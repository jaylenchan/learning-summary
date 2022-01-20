# 基本概述

K8S本质是一组特定的服务器集群，它可以在集群的每一个节点上去运行特定的程序，利用这个特定的程序来对节点中的容器进行管理。

K8S的目的就是实现资源管理的自动化。

1. 每个节点安装的特定程序是一样的吗
2. 每个节点安装的特定程序分别是什么？

## 集群组成

1个K8S集群主要由控制节点（做管理的）和工作节点（真正干活的）两部分组成。每个节点安装的组件并不是一样的。

### master节点：负责集群的管理

> ApiServer：负责所有用户对集群的控制操作，用户对集群的操作都是从这个地方进来的，所以可以做一些访问的控制。
>
> Scheduler：负责计算用户对集群的操作具体要给集群哪一个节点去执行，；即计算一件事是Node1负责，还是Node2负责。（只负责算谁来负责）
>
> Controler-manager：负责真正分配活给集群中的节点来做；即真正去分配一件事给Node节点做（真正安排活给节点做）
>
> Etcd：记录资源信息。比如Controler-manager分配活给Node1做，那就可以在Etcd记录下这件事是分配给了Node1在做。

![image-20200406184656917](https://raw.githubusercontent.com/workcjl/image_store/main/img/K8S%E7%BB%84%E6%88%90.png)

### Node节点：真正干活的

> Kubelet：负责接收master节点发来的消息，控制Docker跑容器操作
>
> KubeProxy：负责用户对集群的访问操作（区别开ApiServer，ApiServer是控制操作，这个是访问操作）。这个的作用是为了访问实际给用户使用的程序。而APIServer做的事情是对K8S这个集群的控制。
>
> Docker： 负责跑容器操作

例子：下面，以部署一个nginx服务来说明kubernetes系统各个组件调用关系：

1. 首先要明确，一旦kubernetes环境启动之后，master和node都会将自身的信息存储到etcd数据库中

2. 一个nginx服务的安装请求会首先被发送到master节点的apiServer组件

3. apiServer组件会调用scheduler组件来决定到底应该把这个服务安装到哪个node节点上

   在此时，它会从etcd中读取各个node节点的信息，然后按照一定的算法进行选择，并将结果告知apiServer

4. apiServer调用controller-manager去调度Node节点安装nginx服务

5. kubelet接收到指令后，会通知docker，然后由docker来启动一个nginx的pod

   pod是kubernetes的最小操作单元，容器必须跑在pod中至此，

6. 一个nginx服务就运行了，如果需要访问nginx，就需要通过kube-proxy来对pod产生访问的代理

这样，外界用户就可以访问集群中的nginx服务了

## 基本概念

节点：一台服务器

资源：K8S中所有内容都被抽象为资源，一切皆资源。Pod、Service、Controler这些都是资源。

Master： 负责管理Node的节点。一个K8S集群一定要有一个Master管理的节点，没人管理的话，整个集群就没法工作了。所以一个Master配多个Node的方式比较危险，应该是多个Master配多个Node最好。

Node：负责干活的节点

Pod：K8S最小单位，里头跑着一个或者多个容器

Controler：负责控制Pod的组件，可以创建Pod，销毁Pod等

Service：负责提供给外界访问Pod的入口；即外界用户访问这个玩意，而不是直接访问Pod

Label：Controler和Service要想跟每个Pod挂钩，就要有可以联系起来的东西。K8S通过给Pod打标签的形式，然后通过Controler和Service去选择标签，就可以知道跟哪一类标签的Pod产生关联，就可以控制那一类标签的Pod了

NameSpace: 用来隔离Pod的运行环境，即想要使得几个Pod之间可以互相访问，其他的不能访问进来，就可以使用命名空间的方式隔离，相当于隔离了不同的空间，于是处在空间外部的Pod就没法访问内部的Pod了。

## 资源管理

> kubernetes的本质上就是一个集群系统，用户可以在集群中部署各种服务，所谓的部署服务，其实就是在kubernetes集群中运行一个个的容器，并将指定的程序跑在容器中。
>
> kubernetes的最小管理单元是pod而不是容器，所以只能将容器放在`Pod`中，而kubernetes一般也不会直接管理Pod，而是通过`Pod控制器`来管理Pod的。
>
> Pod可以提供服务之后，就要考虑如何访问Pod中服务，kubernetes提供了`Service`资源实现这个功能。
>
> 当然，如果Pod中程序的数据需要持久化，kubernetes还提供了各种`存储`系统。

![image-20200406225334627](https://raw.githubusercontent.com/workcjl/image_store/main/img/k8s.png)

## 环境准备

```shell
1. #安装必备工具
yum install vim wget chrony -y
# vim 编辑器
# wget 下载软件的工具
# chrony 时间同步服务(原来使用ntpdate)

2. #关闭防火墙
# 原因：因为k8s会自己创建防火墙的规则
systemctl stop firewalld && systemctl disable firewalld 

3. #关闭swap分区
# swap分区是linux的交换分区，在系统资源不够的时候，swap分区就会启动，这个我们是不需要的。我们需要的是，让新创建的服务自动调度到集群的其他node节点中去，而不是使用swap分区。
swapoff -a # 暂时关闭swap分区

4. #关闭Selinux
# 目的：这是为了让我们能够支持容器访问宿主机的文件系统

## 暂时关闭Selinux
setenforce 0 

## 永久关闭
vim /etc/sysconfig/selinux 
SELINUX=disabled

5. #统一系统时间和时区
## 统一时区为上海时区
ln -snf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
bash -c "echo 'Asia/Shanghai' > /etc/timezone"
## 统一使用阿里服务器进行时间更新
vim /etc/chrony.conf
pool ntp1.aliyun.com iburst # 修改第一行为这个

## 系统后台自启动时间更新服务
systemctl enable chronyd
systemctl start chronyd

6. #安装docker
## 安装依赖工具
yum install yum-utils device-mapper-persistent-data lvm2

## 配置docker安装源
yum-config-manager \
    --add-repo \
    http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
  
## 下载docker
yum install docker-ce docker-ce-cli containerd.io -y

7. #配置自启动docker
systemctl start dokcer
systemctl enable docker # 配置开机自启动

8. #配置docker镜像仓库源
tee /etc/docker/daemon.json <<-'EOF'
{
 "registry-mirrors": ["https://registry.docker-cn.com","https://nrbewqda.mirror.aliyuncs.com","https://dmmxhzvq.mirror.aliyuncs.com"]
}
EOF

9. #重新加载镜像配置文件
systemctl daemon-reload

10. #重新启动docker
systemctl restart docker

11. #配置k8s安装源
cat <<EOF > /etc/yum.repos.d/kubernetes.repo
[kubernetes]
name=Kubernetes
baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64/
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg
EOF
12. #安装k8s组件
yum install -y kubelet kubeadm kubectl
# kubelet k8s的服务端程序。负责创建启动服务容器。是k8s核心组件，会运行在集群的所有节点上。角色等同于mysqld后台服务程序，都是运行在后台的程序负责提供服务。

# kubectl k8s的客户端程序。负责初始化集群，加入子节点。角色等同于mysql客户端程序，都是负责向后台服务程序发命令的。

# kubeadm k8s的管理员工具。负责管理资源（删除、创建）。是k8s的命令行工具。角色等同于mysqladmin管理员工具

13. #启动k8s
systemctl enable kubelet && systemctl start kubelet

14. #设置bridge-nf-call-iptables
## 配置内核参数，将桥接的IPV4浏览传递到iptables链
## 开启bridge-nf-call-iptables
echo 1 > /proc/sys/net/bridge/bridge-nf-call-iptables

15. #配置Master
## master是集群里头的调度节点和主要节点

## 修改主机名称为master
hostnamectl set-hostname  master

## 配置host
ip addr
vim /etc/hosts

10.211.55.23 k8snode (在master添加node的host)
10.211.55.22 k8snode (在node添加master的host)

## 配置k8s初始化文件(仅限master做这个操作)
kubeadm config print init-defaults > init-kubeadm.conf

## 修改初始化文件
vim init-kubeadm.conf
   ### 修改镜像仓库 
   imageRepository: registry.aliyuncs.com/google_containers
   ### 修改api端点地址 - master机子的ip
   advertiseAddress: 
   ### 找到networking添加一个新属性
   podSubnet: 10.244.0.0/16 # pod的子网掩码

16. #拉取其他组件
## 检查还需要安装哪些组件
kubeadm config images list --config init-kubeadm.conf
# kubeadm 可以用来拉取我们的默认组件镜像
# kube-apiserver 可以用来提供接口服务，可以让外网访问集群
# kube-control-manager 内部的控制指令工具
# kube-scheduler 内部的任务调度器
# kube-proxy 反向代理和负载均衡的工具，提供流量转发
# pause 进程管理工具
# etcd 保持集群内的数据一致性
# coredns 集群内网通信
kubeadm config images pull --config init-kubeadm.conf
## 可能下载失败： failed to pull image "registry.aliyuncs.com/google_containers/coredns:v1.8.4": output: Error response from daemon: manifest for registry.aliyuncs.com/google_containers/coredns:v1.8.4 not found: manifest unknown: manifest unknown, error: exit status 1
## 解决方式
docker pull coredns/coredns:1.8.0 #如果下载慢，自己配置代理export http_proxy=xxx
docker tag coredns/coredns:1.8.0 registry.aliyuncs.com/google_containers/coredns:v1.8.4 #修改镜像名字
## 如果成功了的话会显示
Your Kubernetes control-plane has initialized successfully!

To start using your cluster, you need to run the following as a regular user:

  mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config

Alternatively, if you are the root user, you can run:

  export KUBECONFIG=/etc/kubernetes/admin.conf

You should now deploy a pod network to the cluster.
Run "kubectl apply -f [podnetwork].yaml" with one of the options listed at:
  https://kubernetes.io/docs/concepts/cluster-administration/addons/

Then you can join any number of worker nodes by running the following on each as root:

kubeadm join 10.211.55.22:6443 --token abcdef.0123456789abcdef \
 --discovery-token-ca-cert-hash sha256:1f248929dd3ecba8b780f954d0fb896b73406f293c54339db7b2dfb3f9a5fee5
 

## 如果报错，就往这个文件里头/etc/docker/daemon.json添加
vim /etc/docker/daemon.json
"exec-opts": ["native.cgroupdriver=systemd"]

为了启动k8s: 
mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config

17. #初始化K8s
kubeadm init --config init-kubeadm.conf

18. #在node节点上运行
kubeadm join 10.211.55.22:6443 --token abcdef.0123456789abcdef \
 --discovery-token-ca-cert-hash sha256:1f248929dd3ecba8b780f954d0fb896b73406f293c54339db7b2dfb3f9a5fee5
## 成功之后就会提示已加入集群
his node has joined the cluster:
* Certificate signing request was sent to apiserver and a response was received.
* The Kubelet was informed of the new secure connection details.

Run 'kubectl get nodes' on the control-plane to see this node join the cluster.

19. #回到master节点，测试一下是否已经加入
kubectl get nodes # 查看集群中的所有节点
##  其中node其实就是自己设置的当前节点的名字
NAME      STATUS     ROLES                  AGE     VERSION
k8snode   NotReady   <none>                 2m22s   v1.22.0
node      NotReady   control-plane,master   3m40s   v1.22.0

20. #安装网络Flannel
# 作用：创建一个虚拟网络，让不同节点的服务有着全局唯一的ip地址。且服务之前可以互相访问和连接。
# 注意：在集群内网，网络通信协议通讯模式，采用了Flannel协议
wget https://raw.githubusercontent.com/coreos/flannel/master/Documentation/kube-flannel.yml
#或者使用珠峰的
wget  https://img.zhufengpeixun.com/kube-flannel.yml

docker pull quay.io/coreos/flannel:v0.13.0-rc2

kubectl apply -f kube-flannel.yml

net-conf.json: | 
{
 "Network": "10.244.0.0/16",
 "Backend": {
   "Type": "vxlan"
 }
}

21. #将master的配置文件拷贝到node节点当中去
scp $HOME/.kube/config root@10.211.55.23:~/
# 更改下所属组和所属人
chown $(id -u):$(id -g) $HOME/.kube/config


22. #在node节点中启用配置
kubectl apply -f kube-flannel.yml
```

## 开始使用

```shell
1. #
kubectl create deployment nginx --image=nginx
kubectl expose deployment nginx --port=80 --type=NodePort
kubectl get pod,svc
```

## Service

### 服务发现

服务发现的意思就是使用一个注册中心，来记录分布式系统当中的全部服务的信息，方便其他的服务去快速找到这些已经注册的服务。

我们可以使用DNS的机制，给每一个service加一个内部的域名，然后利用coreDNS转换成服务的真实ip，这样直接访问服务的域名，就会自动指向他们真实的ip。

```shell
# 1. 建立两个服务Service
# 2. 进入其中一个服务的Pod
kubectl exec -it Pod 名字 -- /bin/bash
# 3. 在进入这个Pod之后，直接用服务的名称访问另一个服务
curl http: 另一服务的名字：容器端口号
```

## 安全机制

1. 认证是告诉我你是谁并证明你是谁

2. 授权是我知道你是谁，我要判断你的权利有多大。

   根据创建的Linux用户去使用，默认操作k8s集群的人是root，超级管理员。但是如果新创建了一个新的用户的话，会发现使用`kubectl get pods`这些命令没法使用的。要想使用的话必须给这些角色进行授权。

## RBAC

1. 使用kubeadm安装的集群默认就是这个授权方式
2. rbac描述的就是“给哪些对象给予什么权限”
3. 对象：Users 、Groups、ServiceAccount
4. 角色：代表着一组权限。拥有了某组权限就代表了某个角色
5. 绑定：将定义好的角色跟用户绑定

![image-20200519181209566](https://raw.githubusercontent.com/workcjl/image_store/main/img/k8s-RBAC.png)

1. k8s当中有两种角色，一种是role - 普通角色，一种是clusterRole-集群角色。普通角色只能应用在某一个特定的命名空间之下，比如kube-system这个命名空间，那么你创建一个普通角色role，然后指定了namespace是kube-system。那么这个角色的作用范围就是kube-system这个命名空间而已。而集群角色是指创建的角色对集群内都有效。
2. k8s当中有两种用户，一种是userAccount -用户账户，一种是serviceAccount-服务用户。

## 笔记

podSubnet pod子网必须要跟flanel网络配置的网段是相同的才行。

master和node都要装上flanel协议。flanel的作用就是构建一个子网，让子网里头的pod可以互相通信。

master负责统领全局的，不做具体的执行

我们给pod集群分配一个虚拟ip，然后通过这个虚拟ip就可以访问到这个集群了

ingress是基于nginx的实现，用来做负载均衡。anotations是ingress中最重要的配置，用来修改ingress的行为。

configMap用来存储配置信息

<https://zhuanlan.zhihu.com/p/105006577>

<https://www.aliyundrive.com/s/kxsuGkfpvBJ/folder/60f6c879a00ff31ab8344d13993e976b543792ff>

<https://www.yuque.com/sunxiaping/yg511q/od4gy0>

<https://zhuanlan.zhihu.com/p/352057834>

<https://www.jianshu.com/p/31c70cdc711c>

<https://jingyan.baidu.com/article/e4d08ffde67eb44fd3f60d68.html>

<https://hands-on-tech.github.io/2020/03/15/k8s-jenkins-example.html>

<https://zhuanlan.zhihu.com/p/40346581>

k8s问题：

```
问题：The connection to the server 10.211.55.22:6443 was refused - did you specify the right host or port?
解决：https://discuss.kubernetes.io/t/the-connection-to-the-server-host-6443-was-refused-did-you-specify-the-right-host-or-port/552/4

sudo -i
swapoff -a
exit
strace -eopenat kubectl version


问题：helm安装ingress-nginx报错
解决：
kubectl get clusterrole | grep ingress
kubectl get clusterrolebinding | grep ingress
然后
kubectl delete clusterrole 上边两条命令找到的所有东西

kubectl delete clusterrolebinding 上边两条命令找到的所有东西
比如： kubectl delete clusterrole ingress-nginx-admission
kubectl delete clusterrolebinding ingress-nginx-admission
```

日志排查： journalctl -f -u kubelet

```
k8s.gcr.io/ingress-nginx/controller:v1.0.0@sha256:0851b34f69f69352bf168e6ccf30e1e20714a264ab1ecd1933e4d8c0fc3215c6
```

```
k8s.gcr.io/ingress-nginx/kube-webhook-certgen:v1.0@sha256:f3b6b39a6062328c095337b4cadcefd1612348fdd5190b1dcbcb9b9e90bd8068
```

```
k8s.gcr.io/ingress-nginx/kube-webhook-certgen:v1.0@sha256:f3b6b39a6062328c095337b4cadcefd1612348fdd5190b1dcbcb9b9e90bd8068
```

ingress 和ingress route 区别：<https://blog.51cto.com/u_11093860/2516096>

<https://soulchild.cn/2159.html>

<https://cloud.tencent.com/developer/article/1638272>

<http://www.mydlq.club/article/41/>

<https://www.cnblogs.com/ninejy/p/14152460.html>

<https://www.cnblogs.com/wenyang321/p/14051973.html>
