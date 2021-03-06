shell是我们和计算机进行交互的界面，是一个翻译家，它能够将我们输入的命令翻译成机器语言，告诉Linux内核我们要做的事情，同时也可以将机器语言翻译回高级语言，告诉我们Linux内核操作的结果。

shell还有一层意思，指的是shell编程语言，是解释执行的语言，它可以直接调用Linux系统命令，十分方便。

shell是一类翻译器，而不是一个。如果我们想要查看自己Linux上支持的shell都有哪些，那么你可以使用 `cat /etc/shells`命令查看，就可以看到自己的系统支持多少个shell了。

## shell脚本的执行方式

---

- 使用echo -e来支持颜色输出

  ```shell
  echo -e "\e[1;31m abcd  \e[0m"
  ```

  `echo -e` 是指输出特殊字符

  `\e[1;`是开始颜色输出

  `\e[0m`是结束颜色输出

  `31m`是指红色

  `abcd`是指输出的字符是abcd

- .sh文件

  虽然我们常常写的脚本文件都是.sh结尾的后缀名，但是实际上，在Linux当中并不是以后缀名去辨别可执行文件的，而是以`x`权限去辨别的。所以，在写.sh文件的时候，常常需要切换权限获取`x`权限，而不是看到了.sh就完事了。

  在shell脚本中，`#!/bin/bash`并不是注释，而是告诉Linux在shell脚本里头，下面写的东西是shell可执行脚本。

- 执行shell脚本

  `chmod 755 xx.sh`首先更改获取执行脚本的权限

  `./xx.sh相对路径`或者`xx.sh绝对路径`两种方式来调用脚本。

  但是你会发现Linux系统内置的命令ls这些是不要路径方式调用的，其实这是Linux系统帮我们简化了操作，利用的就是PATH变量。

- windows写的shell和linux写的shell区别

  在windows写的shell回车符是`^M$`，而Linux中写的shell回车符是`$`，这就导致了windows写的shell在linux当中执行报错，类似错误是`bad interpreter：没有那个文件或者目录`

  要想查看全部字符，需要在使用`cat`命令时查看所有字符包括隐藏的这些回车符，我们可以使用`cat -A xxx.sh`的方式去查看脚本寻找错误。

  为了解决这样一个问题，我们常常使用命令 `dos2unix xx.sh`将window上写的dos脚本格式转化成`unix`脚本格式，从而支持Linux系统去执行这个脚本。

## Bash基本功能

---

- 历史命令

  我们再shell当中敲入的命令都可以通过`history`去查看获得。在Linux当中，我们还有一个`.bash_history`的历史命令保存文件。但是默认的，我们直接在命令行当中敲入的命令，虽然在`history`输出后可用看到，却不会自动的写入`.bash_history`历史命令保存文件。而是等我们正常退出后，它才会将内存中缓存的命令写入`.bash_history`历史命令保存文件当中。如果你想立即写入，那么你可以这么写`history -w .bash_history`手动的将历史命令写入`.bash_history`。历史命令默认可以保存1000条，不过我们可以到`/etc/profile`配置文件当中去修改条数。

  调用历史命令，我们可以使用上下箭头。同时我们也可以`history`之后，使用`!n`指定使用第n条历史命令。我们也可以使用`!字符串`，指的是请帮我执行最后一条以该字符串开头的命令。当然我们如果只是想不断重复执行上一条命令的话，可以使用`!!`来达到我们想要的效果。

- 命令别名

  在bash当中我们可以使用tab键来进行命令的补全。在shell中我们还可以使用命令别名来给命令起另外一个名字，方便我们去调用 `alias vi=vim`,格式是`alias 别名=命令名`

  如果我们想要删除别名，就可以使用`unalias 别名`。

  如果我们想要让命令别名永久生效，那么我们需要去修改`/root/.bashrc`这个配置文件。

- 输入输出重定向

  标准的输入和输出。键盘就是标准输入设备，设备名是`/dev/stdin`，文件的描述符是`0`。显示器就是标准输出设备（还有打印机，投影仪等），设备名是`/dev/stdout`，文件描述符是`1`。同时显示器的类型还是标准错误输出，设备名是`/dev/stderr`，文件描述符是`2`。其中文件描述符的意思是用什么数字来代表什么东西，这里的意思其实是用0代表标准输入，用1代表标准输出，用2代表标准错误输出。

- 普通输出重定向

  输出正常来说，是输出到屏幕上边的。现在我们不要它输出到屏幕上，改变它的输出方向，输出到了文件当中，所以说叫做输出重定向。输出重定向的经典用途就是日志，每天的日志在早上五点备份，就需要不断往文件写日志，输出的方向是日志，也就是把命令的结果保存到日志中。

  并不是所有命令都有输出重定向的，判断标准类似于一个函数是否有返回值，也就是说这个命令是确实有输出东西出来的才会有输出重定向。你可以使用`> 文件`以覆盖的方式来将命令的输出重定向到文件中，也可以使用`>> 文件`以追加的方式来将命令的输出重定向到文件中。举例子：`ls > hello`或者`ls >> hello`

- 错误输出重定向

  有的时候我们可能会输错命令`ls`写成了`lst`，于是输出就会报错。这个时候我们想要将错误的输出给他保存到文件当中，于是我们可以使用`lst 2> 文件`以覆盖的形式重定向错误到文件中，或者使用`lst 2>> 文件`以追加的形式重定向错误到文件当中。其中我们用`2`来代表错误命令产生的输出。具体的错误重定向格式就是`错误命令 2> 文件`、`错误命令 2>> 文件`
  
- 同时保存正确输出和错误输出

  `命令 &> 文件`或者追加的方式`命令 &>> 文件`

- 将不想要看到的输出丢到垃圾箱

  `命令 &> /dev/null`，用途就是在写shell脚本的时候有些命令时一定会打出输出来的，我们想要的结果就是不需要执行出输出，直接继续执行，这时候可以将这些输出结果丢到垃圾箱里头

- 分开保存正确输出和错误输出

  `命令 >>文件1 2>>文件2`，用途就是在服务日志生成时，我们将正确的输出放一个文件，错误的输出放在另外一个文件，需要排查的时候可以正确的看正确文件，错误的看错误文件。

- 输入重定向

  一开始，我们的输入都是从键盘输入的，现在我们就改变它的方向，从文件输入。这就是输入重定向。输入重定向的应用场景就是给源码包打补丁时用到。

  `wc`可以进行字符统计，配合输入重定向，举例子就是`wc < ex.txt`从ex.txt输入给wc统计

- 多命令顺序执行

  `命令1;命令2`多个命令顺序执行，但是命令和命令之间可能没啥逻辑关系，先执行谁都行

  `命令1&&命令2`逻辑与命令，命令1正确后才执行命令2；否则命令1不正确，命令2也不执行

  `命令1||命令2`逻辑或命令，命令1不正确就执行命令2；否则命令1正确，直接结束，命令2不执行

- 管道符

  `命令1| 命令2`，命令1的输出作为了命令2的输入结果，比如`ls | grep "haha"`

- 通配符

  使用`?`来代表1个字符（绝对是1个，不多也不少哦！）；使用`*`任意多个字符（0个，1个，多个）；使用`[abc]`代表`abc`三个中的其中一个字符；使用`[1-9]`代表1-9这个范围内的一个字符（绝对是1个，不多也不少哦）；使用`[^1-9]`代表非1-9这个范围内的一个字符（绝对是1个，不多也不少哦）。`[]`看到这个绝对是匹配一个字符，跟`?`一样的。

  通配符的具体用途是用来匹配文件名的

- 特殊符号

  `''`单引号的用途是一个字符串中间有空格的时候，就用单引号包裹起来，被单引号包裹起来的所有东西都没有特殊意义了，全是当做字符串看。使用`""`双引号的话，一些特殊符号就拥有自己的特殊意义，比如说`$`在双引号当中是有特殊符号意义的，但在单引号中直接就是普通字符串来看。

  举例子：`echo '$HOME'`和`echo "$HOME"`的效果是不同的

  \`系统命令\`反引号的作用就是可以在反引号里头调用系统的命令，然后将结果可以给变量赋值，不过我们也可以使用`$(系统命令)`

  举例子:

  ```shell
  name=`date`
  # 等价于
  name=$(date)
  echo $name
  执行过程是：先执行date，然后将执行的结果赋值给name，然后输出name的值
  ```

- Bash变量

  - 用户自定义变量

    > Bash变量默认都是字符串类型的，如果要进行数值的运算，必须显示指定变量类型为数值类型。变量赋值的时候一定不要给等号两边加空格美化，会报错。比如说`name=zhangsan`不要写成`name = zhangsan`！在给变量赋值的时候，值如果是一个带有空格的字符串，都一定要用`''`单引号包裹起来。比如说`name='zhang san'`而不是`name=zhang san`。环境变量尽量规范，都大写！
    >
    > - 叠加变量
    >
    >   变量的值是可以叠加的`name=zs`，可以叠加变量`name="$name"ww`
    >
    >   或者写成这个格式`name=${name}22`
    >
    > - 定义变量
    >
    >   `name=sh`
    >
    > - 调用变量
    >
    >   `echo $name`
    >
    > - 查看所有变量(包括自定义变量、环境变量)
    >
    >   `set`
    >
    > - 删除变量
    >
    >   `unset name`

  - 环境变量

    > 主要保存的是跟系统操作相关的数据
    >
    > 环境变量有系统定义的，也可以允许用户去自定义
    >
    > 用户自定义变量和环境变量的区别：用户自定义的变量只在当前的shell中生效，而环境变量则是在当前shell和它的子shell中都生效。进一步地，如果说将环境变量直接写到了配置文件当中，那么就是所有的shell都会生效。
    >
    > - 定义变量
    >
    >   export 变量名=变量值
    >
    > - 查询环境变量
    >
    >   env
    >
    > - 将一个自定义变量转化为环境变量
    >
    >   // 自定义变量
    >
    >   name=zs
    >
    >   // 转化为环境变量
    >
    >   export name
    >
    > - 删除环境变量
    >
    >   unset  name
    >
    > $PATH：系统命令查找的路径

  - 位置参数变量

    > 用途：向脚本当中传递参数或者数据。
    >
    > 位置参数的变量名不能自定义，而且变量的作用也是固定的。
    >
    > 其实位置参数变量也是预定义变量
    >
    > 我们使用 `$0`代表命令本身，使用`$1`到`$9`代表第一个参数到第九个参数。如果是10以上的参数要使用`${10}`的方式来写。`$n`的实际应用场景就是向程序当中传入实际的值，将`$n`写在程序当中，然后调用shell脚本的时候对应传参。
    >
    > 我们使用`$*`和`$@`代表所有的参数（不包括命令本身）。不同的是`$*`是把所有参数当成一个整体，如果放在for in `$*`，只会循环一次。而放在for in `$@`，会循环多次，区别看所有参数，而不是一个整体。
    >
    > 我们使用`$#`来代表参数的个数

  - 预定义变量

    > Bash中已经定义好的变量。
    >
    > 预定义变量的变量名不能自定义，而且变量的作用也是固定的
    >
    > 我们使用`$?`来获取上一次命令执行的状态。如果返回的是0，说明上一次命令正确执行，如果返回的是非0，那么说明上一次命令不正确执行。我们写的程序是可以靠$?来判断上一条是否执行正确了。
    >
    > 我们使用`$$`来获取当前进程的进程号PID
    >
    > 我们使用`$!`来获取**后台运行的**最后一个进程的进程号PID（最小化就是放入后台运行 ）

我们可以声明一个特定类型的变量`declare -选项 变量名`，也可以取消变量的类型声明`declare +选项 变量名`

- 变量测试与内容替换

- 环境变量配置文件

  - source命令

    `source 配置文件`或者`. 配置文件`可以立即让配置文件生效。

  - ```shell
    # 对所有用户都有效
    /etc/profile
    /etc/profile.d/*.sh
    /etc/bashrc
    # 仅对当前用户有效
    ~/.bashrc
    ~/.bash_profile
    ```
