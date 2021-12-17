# 主机名
HOST_NAME := k8smaster
# master节点名字
MASTER_NAME := k8smaster
# node1节点名字
NODE_NAME := k8snode1
# master节点IP
MASTER_IP := 10.211.55.30
# node1节点IP
NODE_IP := 10.211.55.31
# HOST文件
HOST_CONF := /etc/hosts
# K8S CONF
K8S_CONF := /etc/sysctl.d/k8s.conf
# Dokcer 版本号
DOCKER_VERSION := 20.10.8
# Docker Daemon文件
DOCKER_DAEMON := /etc/docker/daemon.json
# K8S Yum 软件源位置
K8S_YUM_REGISTRY := /etc/yum.repos.d/kubernetes.repo
# K8S Version
K8S_VERSION := 1.21.1
# USER 文件所有者
FILE_USER := $(shell id -u)
# GROUP 文件所有组
FILE_GROUP := $(shell id -g)
# 添加执行权限
ADD_EXEC_MODE := $(shell touch ip.sh && chmod u+x ip.sh)
# 当前目录绝对路径
CURRENT_DIR := $(shell pwd)

#------------------------------------------------------------------------------------------------------------------------------#
#------------------------------------------------------------------------------------------------------------------------------#
# 1.关闭防火墙（停止并禁用）
.PHONY: disabled_firewalld
disabled_firewalld:
	# 临时关闭firewalld 
	systemctl stop firewalld
	# 永久关闭firewalld
	systemctl disable firewalld
	echo '🎉Successfully disabled firewalld!'
#------------------------------------------------------------------------------------------------------------------------------#
#------------------------------------------------------------------------------------------------------------------------------#
# 2.关闭selinux
.PHONY: disabled_selinux
disabled_selinux:
	# 临时关闭selinux
	setenforce 0 
	# 永久关闭selinux
	sed -i 's/enforcing/disabled/' /etc/selinux/config
	echo '🎉Successfully disabled selinux!' 
#------------------------------------------------------------------------------------------------------------------------------#
#------------------------------------------------------------------------------------------------------------------------------# 
# 3.关闭swap分区
.PHONY: disabled_swap
disabled_swap:
	# 临时关闭swap
	swapoff -a 
	# 永久关闭swap
	sed -ri 's/.*swap.*/#&/' /etc/fstab
	echo '🎉Successfully disabled swap!'
#------------------------------------------------------------------------------------------------------------------------------#
#------------------------------------------------------------------------------------------------------------------------------#
# 4.设置主机名
.PHONY: set_hostname
set_hostname:
	hostnamectl set-hostname $(HOST_NAME)
	echo "🎉Successfully set hostname to |$(HOST_NAME)|"
#------------------------------------------------------------------------------------------------------------------------------#
#------------------------------------------------------------------------------------------------------------------------------#
# 5.在master上添加hosts
.PHONY: set_hosts
set_hosts:
	# 配置master节点host
	echo $(MASTER_IP) $(MASTER_NAME) >> $(HOST_CONF)
	# 配置node1节点host
	echo $(NODE_IP) $(NODE_NAME) >> $(HOST_CONF)
	echo "🎉Successfully set hosts \
	|$(MASTER_IP) $(MASTER_NAME)| \
	$(NODE_IP) $(NODE_NAME)| \
	to |$(HOST_CONF)| "
#------------------------------------------------------------------------------------------------------------------------------#
#------------------------------------------------------------------------------------------------------------------------------#
# 6.将桥接的IPv4流量传递到iptables的链
.PHONY: set_iptables
set_iptables:
	echo net.bridge.bridge-nf-call-ip6tables = 1 >> $(K8S_CONF)
	echo net.bridge.bridge-nf-call-iptables = 1 >> $(K8S_CONF)
	# 生效
	sysctl --system
	echo "🎉Successfully set iptables!"
#------------------------------------------------------------------------------------------------------------------------------#
#------------------------------------------------------------------------------------------------------------------------------#
# 7.时间同步
.PHONY: sync_time
sync_time:
	yum -y install chrony
	sed -i "/pool 2.centos.pool.ntp.org iburst/iserver ntp.aliyun.com iburst" /etc/chrony.conf
	systemctl enable chronyd
	systemctl restart chronyd
	echo "🎉Successfully sync time!"
#------------------------------------------------------------------------------------------------------------------------------#
#------------------------------------------------------------------------------------------------------------------------------#
# 8.安装Docker
.PHONY: install_docker
install_docker:
	wget https://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo -O /etc/yum.repos.d/docker-ce.repo
	yum -y install docker-ce-$(DOCKER_VERSION)
	docker --version
	echo "🎉Successfully install docker!"
#------------------------------------------------------------------------------------------------------------------------------#
#------------------------------------------------------------------------------------------------------------------------------#
# 9.启动Docker
.PHONY: start_docker
start_docker:
	systemctl enable docker
	systemctl start docker
	docker --version
	echo "🎉Successfully start docker!"
#------------------------------------------------------------------------------------------------------------------------------#
#------------------------------------------------------------------------------------------------------------------------------#
# 10.配置Docker镜像源
.PHONY: set_image_registry
set_image_registry:
	echo {  >> $(DOCKER_DAEMON)
	echo '  "registry-mirrors": ["https://b9pmyelo.mirror.aliyuncs.com"]' >> $(DOCKER_DAEMON)
	echo } >> $(DOCKER_DAEMON)
	systemctl restart docker
	docker --version
	echo "🎉Successfully set image registry!"
#------------------------------------------------------------------------------------------------------------------------------#
#------------------------------------------------------------------------------------------------------------------------------#
# 11.配置添加kubernetes yum软件源
.PHONY: set_k8s_yum_registry
set_k8s_yum_registry:
	echo '[kubernetes]' >> $(K8S_YUM_REGISTRY)
	echo 'name=Kubernetes' >> $(K8S_YUM_REGISTRY)
	echo 'baseurl=https://mirrors.aliyun.com/kubernetes/yum/repos/kubernetes-el7-x86_64' >> $(K8S_YUM_REGISTRY)
	echo 'enabled=1' >> $(K8S_YUM_REGISTRY)
	echo 'gpgcheck=0' >> $(K8S_YUM_REGISTRY)
	echo 'repo_gpgcheck=0' >> $(K8S_YUM_REGISTRY)
	echo 'gpgkey=https://mirrors.aliyun.com/kubernetes/yum/doc/yum-key.gpg https://mirrors.aliyun.com/kubernetes/yum/doc/rpm-package-key.gpg' >> $(K8S_YUM_REGISTRY)
	echo "🎉Successfully set k8s yum registry!"
#------------------------------------------------------------------------------------------------------------------------------#
#------------------------------------------------------------------------------------------------------------------------------#
# 12.安装kubeadm，kubelet和kubectl
.PHONY: install_k8s_core
install_k8s_core:
	yum install -y kubelet-$(K8S_VERSION) kubeadm-$(K8S_VERSION) kubectl-$(K8S_VERSION)
	# 设置开机启动
	systemctl enable kubelet
	echo "🎉Successfully install k8s core!"
#------------------------------------------------------------------------------------------------------------------------------#
#------------------------------------------------------------------------------------------------------------------------------#
# 13.部署K8S Master节点【注意：仅在Master节点进行操作】
.PHONY: init_master
init_master:
	# 因为阿里云没有对应的’registry.aliyuncs.com/google_containers/coredns/coredns:v1.8.0‘
	# 所以未卜先知，提前下载好对应镜像，改tag
	docker pull registry.aliyuncs.com/google_containers/coredns:1.8.0
	docker tag registry.aliyuncs.com/google_containers/coredns:1.8.0 registry.aliyuncs.com/google_containers/coredns:1.8.0
	kubeadm init \
	--apiserver-advertise-address=$(MASTER_IP) \
	--image-repository registry.aliyuncs.com/google_containers \
	--kubernetes-version $(K8S_VERSION) \
	--service-cidr=10.96.0.0/12 \
	--pod-network-cidr=10.244.0.0/16
#------------------------------------------------------------------------------------------------------------------------------#	
#------------------------------------------------------------------------------------------------------------------------------#
# 14.启动kubectl的使用【注意：仅在Master节点进行操作】 
.PHONY: start_use_kubectl
start_use_kubectl:
	mkdir -p $(HOME)/.kube
	cp -i /etc/kubernetes/admin.conf $(HOME)/.kube/config
	chown $(FILE_USER):$(FILE_GROUP) $(HOME)/.kube/config
#------------------------------------------------------------------------------------------------------------------------------#
#------------------------------------------------------------------------------------------------------------------------------#
# 15.Master节点上生成Token
.PHONY: create_token
create_token:
	kubeadm token create --print-join-command
#------------------------------------------------------------------------------------------------------------------------------#
#------------------------------------------------------------------------------------------------------------------------------#
# 16.到Node中执行第15步生成的命令
#------------------------------------------------------------------------------------------------------------------------------#
#------------------------------------------------------------------------------------------------------------------------------#
# 17.部署CNI网络插件
.PHONY: install_flannel
install_flannel:
	kubectl apply -f $(CURRENT_DIR)/packages/kube-flannel/kube-flannel.yaml
	kubectl get pods -n kube-system
#------------------------------------------------------------------------------------------------------------------------------#
#------------------------------------------------------------------------------------------------------------------------------#
# 18.测试集群部署【注意：仅在Master节点进行操作】
.PHONY: test_k8s
test_k8s:
	rm -f ip.sh
	kubectl create deployment nginx --image=nginx
	sleep 20
	$(ADD_EXEC_MODE)
	kubectl get pod -o wide | awk '{if(NR>1){print $$6}}' >> ip.sh
	sed -i "s/\(.*\)/curl \1/" ip.sh
	sh ip.sh && rm -f ip.sh 
	kubectl delete deployment nginx
	echo "🎉Successfully Test K8S!"
#------------------------------------------------------------------------------------------------------------------------------#
#------------------------------------------------------------------------------------------------------------------------------#
# 19.安装Helm
.PHONY: install_helm
install_helm:
	chmod u+x $(CURRENT_DIR)/packages/helm/install-helm3.sh
	ls -lah $(CURRENT_DIR)/packages/helm
	sh $(CURRENT_DIR)/packages/helm/install-helm3.sh
	helm version
	echo '🎉Successfully Install Helm!'
#------------------------------------------------------------------------------------------------------------------------------#
#------------------------------------------------------------------------------------------------------------------------------#
# 20.添加Helm仓库源
.PHONY: add_helm_registry
add_helm_registry:
	helm repo add aliyun https://kubernetes.oss-cn-hangzhou.aliyuncs.com/charts
	helm repo update
	helm repo list
	echo '🎉Successfully add helm registry!'
#------------------------------------------------------------------------------------------------------------------------------#
#------------------------------------------------------------------------------------------------------------------------------#
# 一键安装核心步骤（1~12）
.PHONY: install
install: disabled_firewalld disabled_selinux disabled_swap set_hosts set_iptables sync_time install_docker start_docker set_image_registry set_k8s_yum_registry install_k8s_core
#------------------------------------------------------------------------------------------------------------------------------#
