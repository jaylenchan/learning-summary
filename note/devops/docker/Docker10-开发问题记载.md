- 在开发当中，公司内网服务是`172.17`网段的，跟Docker0的默认网段冲突了，导致了开发容器内部的数据包怎么都没法发送到公司内网服务。

  解决：修改Docker0的网段，将docker daemon.json修改，修改bip字段，将bip字段改成

  `172.18.0.1/16`。其实改成任何符合的网段都行，这里只是一个示例。

- 在开发当中，我使用到了whistle服务器容器和webdev服务器容器。配置whistle规则的时候，发现送往127.0.0.1:80(webdev 所在端口)总是超时。

  解决：问题的原因在于开发思维还停留在本地开发，whislte和webdev放在同一个宿主机上，不同的端口监听。换成容器后，相当于是不同的主机上了，所以应该改成对应webdev容器所在的ip:port才对。由于我在配置docker-compose的时候，自定义了网络，所以whistle容器和webdev容器是一个网络里头的，因此规则改成`xxxx.com webdev`即可，即使用容器名即可在whistle容器发送请求到webdev容器，而不用显示的去指定ip。

- windows10下载docker desktop，启动docker desktop系统弹窗报错“wsl2 installation is not compatible”

  解决：下载wsl_update包更新一下wsl环境

- windows系统下直接通过docker挂载宿主机.ssh目录到容器内，会出现报错，大致意思就是id_rsag给的权限过大，不可以与他人共享私钥，挂载到容器内失败的问题。

  解决：