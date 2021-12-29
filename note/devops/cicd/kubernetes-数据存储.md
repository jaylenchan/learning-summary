# 数据存储

### Volume的意义

我们可以在pod上定义Volume数据卷，这么做的意义有两个：

1. 使用Volume让同一个pod中的多个容器访问共享的目录；
2. 使用Volume让数据持久化存储

### Volume的类型

Volume支持多种类型，常见的类型有：

- 简单存储：EmptyDir | HostPath | NFS
- 高级存储：PV | PVC
- 配置存储：ConfigMap | Secret

### 简单存储

#### EmptyDir

1. 用途

   - 不需要永久保留的临时空间，例如某些应用程序运行的时候所需要的临时目录
   - 多容器共享的目录，一个容器需要从另一个容器获取数据的目录

2. Pod被分配到node的时候创建的，不需要去显示的指定宿主机的目录，k8s会自动在Pod上分配一个目录。当Pod销毁的时候，数据也会跟着永久删除。

3. 实践案例

   描述：

   - 在一个Pod中准备两个容器nginx和busybox
   - 声明一个Volume分别挂载到两个容器的目录中
   - nginx容器负责向Volume中写日志
   - busybox中通过命令将日志内容读到控制台

   场景：

   <img src="https://raw.githubusercontent.com/workcjl/image_store/main/img/EmptyDir案例.png" alt="image-20200413174713773"  />

   文件：

   ```yaml
   apiVersion: v1
   kind: Pod
   metadata:
     name: volume-emptydir
     namespace: dev
   spec:
     containers:
       - name: nginx
         image: nginx:1.17.1
         ports:
           - containerPort: 80
         volumeMounts: # 将logs-volume挂在到nginx容器中，对应的目录为 /var/log/nginx
           - name: logs-volume
             mountPath: /var/log/nginx
       - name: busybox
         image: busybox:1.30
         command: # 初始命令，动态读取指定文件中内容
           - '/bin/sh'
           - '-c'
           - 'tail -f /logs/access.log'
         volumeMounts: # 将logs-volume 挂在到busybox容器中，对应的目录为 /logs
           - name: logs-volume
             mountPath: /logs
     volumes: # 声明volume， name为logs-volume，类型为emptyDir
       - name: logs-volume
         emptyDir: {}
   ```

#### HostPath

1. 用途：

2. 意义：将主机中的一个实际的目录挂载到Pod中，供容器去使用。不会跟着Pod的销毁而销毁。

3. 实践案例

   场景：

   ![image-20200413214031331](https://raw.githubusercontent.com/workcjl/image_store/main/img/HostPath案例.png)文件：

   ```yaml
   apiVersion: v1
   kind: Pod
   metadata:
     name: volume-hostpath
     namespace: dev
   spec:
     containers:
       - name: nginx
         image: nginx:1.17.1
         ports:
           - containerPort: 80
         volumeMounts: # 将logs-volume挂在到nginx容器中，对应的目录为 /var/log/nginx
           - name: logs-volume
             mountPath: /var/log/nginx
       - name: busybox
         image: busybox:1.30
         command: # 初始命令，动态读取指定文件中内容
           - '/bin/sh'
           - '-c'
           - 'tail -f /logs/access.log'
         volumeMounts: # 将logs-volume 挂在到busybox容器中，对应的目录为 /logs
           - name: logs-volume
             mountPath: /logs
     volumes: # 声明volume， name为logs-volume，类型为emptyDir
       - name: logs-volume
         hostPath:
           path: /root/logs
           type: DirectoryOrCreate # 目录存在就使用，不存在就先创建后使用
   ```

#### NFS

1. 用途：如果说Pod部署所在的Node节点挂了，那么这个时候如果Pod重新再挂载的话就是到了其他的节点，这样子的话HostPath模式指定的目录也就没了，需要重新创建。那么其实HostPath也不是那么安全。所以引出了NFS，单独的网络存储系统，不要放在Node1，Node2这些节点上跟他们关联。

2. 实践案例

   场景：

   ![image-20200413215133559](https://raw.githubusercontent.com/workcjl/image_store/main/img/NFS的案例.png)

   

### 高级存储

#### PVC + PV

将具体的存储系统统一抽象成PV，无论是NFS还是CIFS，还是ClusterFS这些存储系统通通抽象成为PV的概念，相当于一个接口，然后供用户调用，这样子用户就不需要知道PV的底层实现是哪个具体的存储系统，就不需要了解各个存储系统再一个个按照各自的配置方式去配置了，这些操作转交给了kubernetes管理员去做。存储类型不同，配置不同，这样就要求我们的管理员必须熟悉各种存储系统的配置了。

用户只需要写一个PVC，进行PV声明，利用PVC声明告诉k8s pod需要多大的存储空间，k8s自动绑定一个具体的pv给pod。

##### PV

PV的配置资源文件是没有namespace这个玩意的，它是集群级别的东西，是跨集群的，所以不要随便写错了给写了一个namespace出来。

```yaml
apiVersion: v1  
kind: PersistentVolume
metadata:
  name: pv2
spec:
  nfs: # 存储类型，与底层真正存储对应
  capacity:  # 存储能力，目前只支持存储空间的设置
    storage: 2Gi
  accessModes:  # 访问模式
  storageClassName: # 存储类别
  persistentVolumeReclaimPolicy: # 回收策略
```

`capacity:  # 存储能力，目前只支持存储空间的设置`,比如说一个NFS系统总共有100G可以使用，我们想要给当前抽象出来的这个PV分配多大的空间。如果我们要把一个100G的NFS系统分配个两个PV去使用，一个capacity可以分配70G，一个capacity分配30G，就是这么使用的。

`accessModes:  # 访问模式`,其实就是控制一个用户访问这个资源的权限。`ReadWriteOnce`：可以执行读写权限，但是只能被单个节点去挂载。比如说一个PV1被PVC1挂载了，PVC1可以对PV1进行读写，但是只能让PVC1读写，其他的比如PVC2就不能再挂载这个PV了。`ReadOnlyMany`的意思就是PVC1，PVC2，PVC3都可以挂载到PV1上来，但是全部只能读。`ReadWriteMany`就是PVC1，PVC2，PVC3都可以挂载到PV1上来，而且都能读写。

`persistentVolumeReclaimPolicy: # 回收策略`的意思就是如果PV不再被使用了，应该怎么做？

##### PVC

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: pvc
  namespace: dev
spec:
  accessModes: # 访问模式
  selector: # 采用标签对PV选择
  storageClassName: # 存储类别
  resources: # 请求空间
    requests:
      storage: 5Gi
```

` resources: # 请求空间
    requests:
      storage: 5Gi`我们需要的PV是5G的。

#### 生命周期

### 配置存储

#### ConfigMap

1. 用途：管理环境变量

2. 命令行创建：

   ```shell
   kubectl create configmap mysql-config --from-literal=MYSQL_HOST=127.0.0.1 --from-literal=MYSQL_PORT=3306
   ```

   

   yaml文件创建：

   ```yaml
   apiVersion: v1
   kind: ConfigMap
   metadata:
     name: mysql-config
   data:
     MYSQL_HOST: "127.0.0.1" # 这里一定要双引号包裹字符串
     MYSQL_PORT: "3306" # 这里一定要双引号包裹字符串
   ```

   命令行文件创建

   ```shell
   # 创建一个configmap,类型是env-from-file从文件中创建，文件地址或者目录地址是./env/config
   kubectl create configmap env-from-file --from-file=./env/config
   # 用命令行文件的方式好处是可以放一个目录
   ```

   

3. 使用configMap

   - 方式一：使用数据卷挂载

   ```yaml
   apiVersion: v1
   kind: Pod
   metadata:
     name: mysql-config-pod
   
   spec:
     volumes:
       - name: mysql-config
         configMap:
           name: mysql-config
     containers:
       - name: mysql-config
         image: nginx:1.17.1
         volumeMounts:
           - name: mysql-config
             mountPath: /configMap
         ports:
           - containerPort: 80
   ```

   - 方式二： 环境变量注入

   ```shell
   apiVersion: v1
   kind: Pod
   metadata:
     name: mysql-config-pod
   
   spec:
     containers:
       - name: mysql-config
         image: nginx:1.17.1
         envFrom: # 建立环境变量
           configMapRef: # 环境变量是通过configMap引用的
             name: mysql-config # 应用的configMap叫做mysql-config
             key: MYSQL_USERNAME # 使用的key是mysql-config这个ConfigMap中的MYSQL_USERNAME
         ports:
           - containerPort: 80
   ```

   

#### Secret

1. 作用：存储机密信息

2. ##### 通用Secret

   - 命令行创建Secret

   ```shell
   # 1. 创建1个通用的秘钥，名字叫做mysql
   kubectl create secret generic mysql \
   --from-literal=MYSQL_USER=root \
   --from-literal=MYSQL_PASSWORD=root
   
   # 2. 以yaml格式查看秘钥的信息
   kubectl get secret mysql -o yaml
   
   结果：
   apiVersion: v1
   data:
     MYSQL_PASSWORD: cm9vdA==
     MYSQL_USER: cm9vdA==
   kind: Secret
   metadata:
     creationTimestamp: "2021-09-04T10:05:00Z"
     name: mysql
     namespace: default
     resourceVersion: "200497"
     uid: de840180-6782-4413-93b1-9d7646e359e6
   type: Opaque
   ```

   - yaml文件形式创建Secret

   ```shell
   # 1. 书写Secret yaml文件: mongo.yaml
   apiVersion: v1
   kind: Secret
   metadata:
     name: mongo
   type: Opaque
   data:
     MONGODB_USER: root
     MONGODB_PASS: root
   
   # 2. 创建一个通用的Secret名字叫做mongo
   kubectl apply -f mongo.yaml
     
   # 2. 以yaml格式查看结果
   kubectl get secret mongo -o yaml
   ```

3. ##### 私有镜像仓库Secret

   作用：拉取私有库的仓库时使用

   - 命令行形式创建

   ```shell
   # 1.创建私有仓库镜像认证Secret，名字叫做cjl-registry
   kubectl create secret docker-registry harbor-secret \
   --docker-username=admin \
   --docker-password=Syjl365199 \
   --docker-email=work.cjl@hotmail.com \
   --docker-server=10.211.55.21:4000
   
   # 2.以yaml格式查看Secret
   apiVersion: v1
   data:
     .dockerconfigjson: eyJhdXRocyI6eyIxMC4yMTEuNTUuMjE6NDAwMCI6eyJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiJhZG1pbiIsImVtYWlsIjoid29yay5jamxAaG90bWFpbC5jb20iLCJhdXRoIjoiWVdSdGFXNDZZV1J0YVc0PSJ9fX0=
   kind: Secret
   metadata:
     creationTimestamp: "2021-09-04T10:27:44Z"
     name: cjl-registry
     namespace: default
     resourceVersion: "202310"
     uid: 60ba64ba-644c-44bf-b89a-a12656a71515
   type: kubernetes.io/dockerconfigjson
   ```

   - yaml文件形式创建

   ```shell
   apiVersion: v1
   kind: Secret
   type: kubernetes.io/dockerconfigjson
   metadata:
     name: csy-registry
   data:
      .dockerconfigjson: eyJhdXRocyI6eyIxMC4yMTEuNTUuMjE6NDAwMCI6eyJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiJhZG1pbiIsImVtYWlsIjoid29yay5jamxAaG90bWFpbC5jb20iLCJhdXRoIjoiWVdSdGFXNDZZV1J0YVc0PSJ9fX0=
   ```

4. ##### 使用Secret

   - 方式一：使用数据卷挂载

     ```shell
     apiVersion: v1
     kind: Pod
     metadata:
       name: volume-secret-pod
     spec:
       volumes:
           # 创建1个叫做secret-volume
         - name: secret-volume 
           # volume是secret类型的volume
           secret: 
             # 这个以volume所基于的secret的名字叫做csy-registry
             secretName: csy-registry 
       containers:
         - name: secret-nginx
           image: nginx:1.17.1
           volumeMounts:
               # 容器挂载数据卷，名字是secret-volume的数据卷
             - name: secret-volume
               # 挂载到容器里头的/secret 
               mountPath: /secret 
               # 这个数据卷是只读的
               readOnly: true
            ports:
              - containerPort: 80
     ```

   - 方式二：注入环境变量

     ```shell
     apiVersion: v1
     kind: Pod
     metadata:
       name: env-secret-pod
     spec:
       containers:
         - name: secret-nginx
           image: nginx:1.17.1
           env:
             - name: USER # 给容器定一个USER环境变量
               valueFrom: # 值的来源是
                 secretKeyRef: # secret
                   name: users # 哪一个secret呢？users这个secret
                   key: USERNAME # users里头的哪一个key呢？USERNAME这个key
           ports:
              - containerPort: 8
     ```

   - 方式三：私有库认证

     ```yaml
     apiVersion: apps/v1
     kind: Deployment
     metadata:
       name: front
     spec:
       selector:
         matchLabels:
           app: front
       template:
         metadata:
           labels:
             app: front
         spec:
           imagePullSecrets: # 私有仓库镜像拉取必须配置 - 私有镜像拉取的秘钥是啥？
             - name: cjl-registry # 密钥是名字叫做cjl-registry的Secret
           containers:
             - name: front
               image: 10.211.55.21:4000/front/front:2021-09-02-14-34-20     
     ```

     