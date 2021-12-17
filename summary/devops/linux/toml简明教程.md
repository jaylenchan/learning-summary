<div align="center">
  <img
  src="https://gitlab.ekwing.com/gz-server/fe-devops/uploads/890115987bee6610ab1ef6cc27adea08/image.png" alt="Toml Tutorial"/>
  <h1 align="center">
  Toml简明教程
  </h1>
</div>

TOML同YAML、JSON一样也是一种配置文件的书写格式，它的作者是由GitHub的创始人Tom Preston-Werner，目标是成为一个极简的配置文件格式。

- **[概述](#概述)**
- **[语法](#语法)**
- **[实例](#实例)**

## 概述

TOML的产生的目的就在于希望能够让开发人员用一种更语义化的方式去写配置文件，同时方便开发人员去阅读。TOML 被设计成可以无歧义地被映射为哈希表从而被多种语言解析，目前常规的开发语言JavaScript、PHP、Objective-C、Python、 Ruby、Swift、Go、C、C++、Dart、Java等都能够支持TOML。

本文书写的目的在于让参与本项目开发的人员能够快速上手TOML格式从而在项目当中能够看得懂TOML配置文件。TOML更多的相关内容可以阅览[TOML](https://github.com/toml-lang/toml)GitHub项目进行阅览查看，同时也可以直接阅览[TOML官网](https://toml.io/en/)进行相应的内容学习。

## 语法

### 注释

---

一份优雅的配置文件应该是具有注释的文件，配置带有注释可以起到让任何接手参与该项目的人员迅速了解该配置文件的配置信息，从而减少配置文件的配置内容成为一条条需要让人猜测的谜
**在TOML当中使用的注释格式跟YAML文件是完全相同的都以`#`开头注释：**

```toml
# 这是一段TOML格式的注释
# 你好， TOML！
```

### 类型

---

值得注意的是，对配置文件来说，不管是JSON格式、YAML格式还是现在要学习的TOML格式来说，无非只是写配置的方式不同，写法不同而已，最终要表达的内容都是相同的。就好像表达一个苹果，我们可以用中文“苹果”，也可以用英文“Apple”，只不过我们“苹果”对我们中国人来说更加容易理解罢了。
既然是配置文件，当然少不了各种类型的书写，这里为了方便理解和记忆，我将类型格式分成简单类型和复杂类型去分别讲解。

#### 简单类型

---

- 在.toml文件里头写字符串

    ```toml
    # 写单行字符串
    siglStr = "单行的TOML字符串，是不是很简单？"
    
    # 写多行字符串
    mutiStr = """
    多行的字符串就是写三个双引号开头，三个双引号结尾而已
    是不是很简单？
    """
    ```

- 在.toml文件里头写数字

    ```toml
  # 这是一个正数
  number1 = +99
  # 这是一个负数
  number2 = -99
  # 这是一个浮点数
  number3 = 9.9
  ```

- 在.toml文件里头写布尔值

    ```toml
  # 这是一个true
  bool1 = true
  # 这是一个false
  bool2 = false
  ```

- 在.toml文件里头写时间

    ```toml
  # 这是一个时间
  date1 = 1979-05-27T07:32:00Z
  # 这是一个写的好看的时间
  date2 = 1979-05-27 07:32:00Z
  # 这是一个只有年月日的时间
  date3 = 1979-05-27
  ```

#### 复杂类型

---

- 在.toml文件里头写对象

    ```toml
    # 这是一个对象
    [cjl] # 像这样子单独一行中使用[name]定义一个对象
    name = "陈佳良" # 用key = value形式书写对象的属性
    title = "初级前端" # cjl这个对象有一个title的属性，值是“初级前端”
    ```

    ```toml
    # 这是一个嵌套对象
    [cjl] # 一个被定义成cjl的人
    name = "陈佳良" # 他的名字叫做陈佳良
    title = "初级前端" # 他是一名初级前端
    [cjl.skill] # 他会的skill
    devops = ["docker", "jenkins", "traefik", "kubernetes", "harbor"]
    ```

     **嵌套对象转化成的json如下：**

    ```json
    {
      "cjl": {
        "name": "陈佳良",
        "title": "初级前端",
        "skill": {
          "devops": ["docker", "jenkins", "traefik", "kubernetes", "harbor"]
        }
      }
    }
    ```

- 在.toml文件里头写数组

    ```toml
    # 这是一个数字数组
    numArr = [ 1, 2, 3 ]
    # 这是一个字符串数组
    strArr = [ "red", "yellow", "green" ]
    # 这样子写的数组也是符合配置TOML格式的
    strArr1 = [
      "red",
      "yellow",
      "green"
    ]
    ```

- 在.toml文件里头写数组嵌套对象

    ```toml
    [[front-end]]
    name = "cjl"
    gender = "male"
    
    [[front-end]]
    name = "zhp"
    gender = "male"
    
    [[front-end]]
    name = "zsx"
    gender = "male"
    
    [[front-end]]
    name = "fjl"
    gender = "male"
    ```

     **数组嵌套对象转换成的json如下：**

    ```json
    {
      "front-end": [
        {
          "name": "cjl",
          "gender": "male"
        },
        {
          "name": "zhp",
          "gender": "male"
        },
        {
          "name": "zsx",
          "gender": "male"
        },
        {
          "name": "fjl",
          "gender": "male"
        }
      ]
    }
    ```

## 实例

1. 有个人叫做陈佳良，性别是男，职位是前端工程师。他有四个同事，各自的基本信息如下：

   - 张辉鹏，性别是男，职位是前端工程师
   - 郭瑞航，性别是男，职位是产品经理
   - 邓锦明，性别是女，职位是后端工程师

   写一个toml文件描述上述信息

   **答案如下：**

   ```toml
   [cjl]
   name = "陈佳良"
   gender = "男"
   job = "前端工程师"
   [[cjl.colleague]]
   name = "张辉鹏"
   gender = "男"
   job = "前端工程师"
   [[cjl.colleague]]
   name = "郭锐航"
   gender = "男"
   job = "产品经理"
   [[cjl.colleague]]
   name = "邓锦明"
   gender = "女"
   job = "后端工程师"
   ```

   **转换后的json如下：**

   ```json
   {
       "cjl":{
           "name":"陈佳良",
           "gender":"男",
           "job":"前端工程师",
           "colleague":[
               {
                   "name":"张辉鹏",
                   "gender":"男",
                   "job":"前端工程师"
               },
               {
                   "name":"郭锐航",
                   "gender":"男",
                   "job":"产品经理"
               },
               {
                   "name":"邓锦明",
                   "gender":"女",
                   "job":"后端工程师"
               }
           ]
       }
   }
   ```

2. 有一个人叫做陈佳良，他养了两条小狗，一条叫做特朗普，一条叫做拜登。特朗普的毛发颜色是白色的，拜登的毛发颜色是黑色。特朗普吃的食物有苹果，蔬菜，米饭，拜登吃的食物是香蕉，粪便，面条。

   写一个toml文件描述上述信息

   **答案如下：**

   ```toml
   [cjl]
   name = "陈佳良"
   [[cjl.pet]]
   name = "特朗普"
   color = "白色"
   food = [ "苹果", "蔬菜", "米饭" ]
   [[cjl.pet]]
   name = "拜登"
   color = "黑色"
   food = [ "香蕉",  "粪便", "面条" ]
   ```

   **转换后的json如下：**

   ```json
   {
      "cjl": {
         "name": "陈佳良",
         "pet": [
            {
               "name": "特朗普",
               "color": "白色",
               "food": [
                  "苹果",
                  "蔬菜",
                  "米饭"
               ]
            },
            {
               "name": "拜登",
               "color": "黑色",
               "food": [
                  "香蕉",
                  "粪便",
                  "面条"
               ]
            }
         ]
      }
   }
   ```
