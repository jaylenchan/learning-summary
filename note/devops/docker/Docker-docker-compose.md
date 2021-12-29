# docker-compose

## 服务和项目

service：1个service其实就是一个应用容器。即`docker run --name xxx nginx`命令跑起来的一个应用容器。

project：1个project是由多个service组成的一组有相同业务逻辑的服务集合，project在docker-compose.yml文件中进行定义。



## 安装docker-compose

```shell

```



## 命令模板

```shell
version: 3

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

