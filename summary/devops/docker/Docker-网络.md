# 网络

```shell
[root@localhost ~]# ip addr
# 以下有三个网络，分别代表了三个不同环境
# 这是本机回环地址
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever

# 这是paralle desktop帮我们生成的网卡，内网地址
2: enp0s5: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc fq_codel state UP group default qlen 1000
    link/ether 00:1c:42:b0:9a:ea brd ff:ff:ff:ff:ff:ff
    inet 10.211.55.3/24 brd 10.211.55.255 scope global dynamic noprefixroute enp0s5
       valid_lft 1195sec preferred_lft 1195sec
    inet6 fdb2:2c26:f4e4:0:5773:b6d1:943d:b9fc/64 scope global dynamic noprefixroute
       valid_lft 2591687sec preferred_lft 604487sec
    inet6 fe80::c097:faee:3e33:5960/64 scope link noprefixroute
       valid_lft forever preferred_lft forever

# 这是docker帮我们生成的网卡，docker地址
3: docker0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc noqueue state DOWN group default
    link/ether 02:42:d2:b0:38:6e brd ff:ff:ff:ff:ff:ff
    inet 172.17.0.1/16 brd 172.17.255.255 scope global docker0
       valid_lft forever preferred_lft forever
    inet6 fe80::42:d2ff:feb0:386e/64 scope link
       valid_lft forever preferred_lft forever
```

我们每启动一个docker容器，docker就会给docker容器分配一个ip。当我们装上了docker之后，就会拥有一个docker0网卡，是桥接模式的，使用的技术就是evth-pair技术。evth-pair就是一对虚拟设备接口，是成对出现的，一段连着协议，一段彼此相连。正因为有这个特性，才使用evth-pair充当桥梁，专门连接各种虚拟网络设备。docker容器之间的连接就是用的这种技术。