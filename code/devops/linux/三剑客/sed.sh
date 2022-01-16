#! /bin/bash

# 一、总揽
## sed可以对文件实现快速的增(create)查(retrieve)改(update)删(delete)【这些都是sed内置命令字符】

## sed总体语法格式： sed [选项] [sed内置命令字符] [输入文件]

## sed [选项] [sed内置命令字符] [输入文件]
### sed  -n    p
### 作用：取消默认sed的输出，就是原来要输出的，加上-n选项后就不会再输出了，这个选项常常和内置命令p一块使用。
### ⚠️：往往取消默认sed输出后，才能按照自己要求去输出想要的内容。默认的话，可能会把你不想要的内容也打印出来。

## sed [选项] [sed内置命令字符] [输入文件]
### sed  -i
### 作用：不需要输出，直接修改文件的内容。如果是像-i.bak这么用，就是先备份源文件，再修改源文件。
### ⚠️：不加-i就不会修改到磁盘里头的文件内容，加了就会直接修改磁盘文件。

## sed [选项] [sed内置命令字符] [输入文件]
### sed  -e
### 作用：多次进行编辑

## sed [选项] [sed内置命令字符] [输入文件]
### sed  -r
### 作用：支持扩展正则表达式

# 二、临时修改输出结果
## C -> 增加(create) sed -n '' strategy.js
### 1. 应用场景：插入
### 需求：

## R -> 查询(retrieve) sed -n 'p' strategy.js
### 1. 应用场景：过滤-过滤指定字符串
#### 需求：过滤出strategy.js中含有errMsg的行
sed -n '/errMsg/p' strategy.js
### 2. 应用场景：取行-取出指定的行
#### 需求：取出strategy.js的1-3行
sed -n '1,3p' strategy.js

## U -> 修改(update) sed -n '' strategy.js

## D -> 删除(delete) sed 'd' strategy.js
## 1. 应用场景：把含有某个字符串的行删除
### 需求： 删除strategy.js的2-4行
sed '2,4d' strategy.js

## 2. 应用场景：把指定的行删除
### 需求：删除strategy.js含有'errMsg'字符串的行
sed '/errMsg/d' strategy.js

# 三、永久修改文件内容
## C -> 增加(create) sed -n '' strategy.js
### 1. 应用场景：追加
### 需求： 在strategy.js文件里头第二行之后追加一行“second-after”，然后对比追加前后差异
sed -i '2a second-after' strategy.js
vimdiff strategy.js.bak strategy.js
### 2. 应用场景：插入
### 需求：在strategy.js文件里头第二行之前追加一行“second-insert”，然后对比追加前后差异
sed -i '2i second-insert' strategy.js
vimdiff strategy.js.bak strategy.js

## D -> 删除(delete) sed -i 'd' strategy.js
## 1. 应用场景：在文件里头把含有某个字符串的行删除
### 需求： 备份strategy.js并删除strategy.js这个文件里头含有errMsg的行，然后比较下备份前后的差异
### ⚠️：对于重要内容，要进行操作前备份操作后检查的流程步骤
sed -i.bak '/errMsg/d' strategy.js  # 操作前备份
vimdiff strategy.js.bak strategy.js # 操作后检查

## U -> 修改(update) sed -i 's//g' strategy.js
## 1. 应用场景：备修改文件里头含有某个字符串的行，替换所有符合要求的内容
### 需求： 备份strategy.js并且替换文件里头所有符合条件的地方，最后检查备份前后文件内容的差异
sed -i.bak 's/errMsg/err/g' strategy.js
vimdiff strategy.js.bak strategy.js

# 四、练习题
# 习题1
# (1).取/etc/passwd的5-15行，并重定向到/test.txt
# (2).把/test.txt中以/sbin/nologin结尾的，都修改为/bin/bash
# (3).查找包含proxy的行
# (4).输出源文件内容并在第8行，插入# i am student，同时以同样的插入要求修改源文件
# (5).删除9-14行输出，同时把源文件也删除9-14行

# (1).取/etc/passwd的5-15行，并重定向到/test.txt
sed -n '5,15p' /etc/passwd >/test.txt
# (2).把/test.txt中以/sbin/nologin结尾的，都修改为/bin/bash
sed -i 's/\/sbin\/nologin/\/bin\/bash/g' /test.txt
# (3).查找包含proxy的行
sed -n '/proxy/p' /test.txt
# (4).输出源文件内容并在第8行，插入# i am student，同时以同样的插入要求修改源文件
sed '8i # i am student' /test.txt
sed -i '8i # i am student' /test.txt
# (5).删除9-14行输出，同时把源文件也删除9-14行
sed '9,14d' /test.txt
sed -i '9,14d' /test.txt

# 习题2
# 使用ubuntu系统，用ifconfig打印出eth0网卡的相关信息，最终要求使用sed编辑器处理输出eth0的ip
# 步骤1 打印出eht0网卡信息
ifconfig eth0
# 步骤2 替换ip前边部分冗余信息
ifconfig eth0 | sed -n '2s/^.*inet  //gp' # 单引号里头有两个动作，1一个s，1个p。-n+p连着用是为了只打印出想打印的信息
# 步骤3 替换ip后边部分冗余信息
ifconfig eth0 | sed -n '2s/  net.*//gp'
# 总体命令:
ifconfig eth0 | sed -n '2s/^.*inet //gp' | sed -n 's/  net.*//gp'

# 习题3
# 使用ubuntu系统，取ip a中eth0网卡的ip
ip a | grep eth0 | sed -n '2s/^.*inet //gp' | sed -n 's/ brd.*//gp' | sed -n 's/\/.*//gp'

# 习题4
# 使用ubuntu系统，取stat /etc/hosts输出结果中的权限数字644
stat /etc/hosts | sed -n '4s/.*(0//gp' | sed -n 's/\/-.*//gp'
# 或者如下
stat /etc/hosts | sed -rn 's/^.*\(0(.*)\/-.*/\1/gp'

# 习题5
# 使用ubuntu系统，用ifconfig打印出eth0网卡相关信息，最终要求用一条命令就可以从输出结果把ip过滤出来
ifconfig eth0 | sed -rn 's/^.*inet (.*)  net.*$/\1/gp' # 利用反向引用，即括号分组，\1就是类似js中$1。-r说明可以用扩展正则表达式
