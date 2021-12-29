# docker-compose

docker-compose的作用就是为了去编排一组容器的。它是以项目为核心，在项目中定义一组具有相同业务的容器并运行起来。



## 服务和项目

service：1个service其实就是一个应用容器。即`docker run --name xxx nginx`命令跑起来的一个应用容器。

project：1个project是由多个service组成的一组有相同业务逻辑的服务集合，project在docker-compose.yml文件中进行定义。



## 安装docker-compose

```shell
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

```shell
sudo chmod +x /usr/local/bin/docker-compose
```



## 命令模板

```shell
version: "3"

services:
  web:
    container_name: 'nginx01' # 相当于docker run --name nginx01
    ports: # 为了暴露端口在主机上访问
    	- "80:80" # 相当于docker run -p 80:80
    volumes: # 为了让容器内的数据持久化
      - nginx:/etc/nginx # 相当于docker run -v nginx:/etc/nginx
    networks: # 为了让整个项目的容器工作在一个自定义的网络中
    	- web # 相当于docker run --net web 
    build:
      context: '.'
      dockerfile: 'dokerfile'
    depends_on: # 代表着这个服务依赖于哪些服务，要等到那些服务所属的容器启动后，这个服务所属的容器才启动
      - mysql  # 说明web服务必须等到mysql服务启动后，才能启动！这里写的是服务名，而不是container_name容器名！

  mysql:
    container_name: 'mysql01'
    ports:
      - "3306:3306"
    volumes:
      - mysql:/var/lib/mysql
    enviroment: # 定义环境变量
      - MYSQL_ROOT_PASSWORD=root
    image: mysql:5.7.32


volumes:
  nginx: # 相当于docker volume create nginx（定义上边服务用到的数据卷名称）
  mysql:
  # 意思是使用外部自定义创建的volume，即自己手动创建一个volume，名字叫做mysql。如果不这么做，比如上边的nginx的volume
  # 如果是nginx那种创建volume的方式，那么实际上生成的volume的名字是项目+volume名，即项目名_nginx
    external: true 
networks:
  web: # 相当于docker network create web（定义上边服务用到的网桥名称）
```

