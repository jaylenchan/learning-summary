## mongo特点
- 性能高 NoSql 查询快： 支持索引、集群、高扩展和伸缩性
- 存储的问题没有mysql那么稳定 （可能会有丢失的情况）
- 基础的数据操作 ，存一些数据量比较大的东西  播放记录 用户登录的信息
- 语法类似于js操作

> redis + mongo + mysql

## mongo的安装
- mac版本  homebrew 安装mongo 
- /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
brew install mongodb-community@3.6
brew services start mongodb-community
```
> https://github.com/mongodb/homebrew-brew

## window安装
- 可以直接下载安装包 安装后会自动安装到电脑的服务中
- 直接mongo运行即可


## 手动启动mongo
```
mongod --dbpath="./data" --port=27018
mongo --port=27018
mongod --config mongo的配置文件
```

## 可视化工具
- https://robomongo.org/download
- navicat,robo3t(mongo官方推荐)


## mongo常用命令
- mysql 数据库 表 行/列
- mongo 存储的数据可以是随意的  数据库 (文件的集合) -> 集合 (文件) -> 文档 (对象BSON)

## 命令集合
- show dbs;  显示所有数据库
- db 显示当前所在的数据库 
- use db 可以切换数据库，如果后续在数据库中添加内容会自动生成数据库
- show collections 显示集合
- db.createCollection('user') 创建空集合 (也可以直接插入数据)
- db.student.insert() 直接往集合中插入数据 ，集合会默认创建出来
- db.user.drop();
- db.dropDatabase();

## 增删改查
- use xxx
0,
## 增加操作
- db.集合名.insert(数据)  (insert可以插入数组的方式)

> _id 尽量用默认的可以保证唯一性，如果手动指定也可以，最好不要手动指定

## 查询操作
- db.集合名.find({},限制字段的显示)

## 修改操作
- db.集合名.update(查询条件,如何修改) 默认的方式是覆盖式的
- 如果希望批量的去更改默认要使用 $ 符号 还要指定multi:true
- multi:true + $来使用

- $set / $unset 新增属性

## 删除 
- db.集合名.remove({},{justOne:true}) 默认全部删除 (只删除一条需要增加模式)

## 数据库相关的 （查询操作是最重要的）


## 查询
- 模糊查询 /reg/ 查询
- 范围查询 $in $nin = $not+$in
- 范围查询 $gt $lt $gte $lte 
- 并且的关系 {a,b} $or 的用法
- 分页查询  可以使用 sort().limit().skip() 
- count查询是紧跟find之后 
- 查询时可以指定显示的字段 1 表示显示（意味着其他不显示） 0 表示不显示 （意味着其他人是显示的） (0,1不能一起用 _id除外)
- 可以直接通过id进行查询

> $all $where ....


## 修改 (操作对象和数组)
- $set / $unset 新增属性 (对象的属性)
- $push $pop 数组的添加 数组的删除 数组的索引修改
- $each $addToSet
- hobby.0:xxxx 通过索引去改值
- $inc 自增

命令行操作


## 数据库的备份
```
mongodump --db school --collection user --out backup
mongorestore ./backup

mongoexport csv
mongoimport
```


## 会给数据库 添加权限
- use admin 创建用户 db.createUser({user:'xxx',pwd:'xxx',roles:[{},{}]})
- mongod  --auth

## 使用mongoose来操作数据库

