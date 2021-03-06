## 正则表达式

---

> 通配符VS正则表达式
>
> 1. 通配符用来匹配**系统中**符合条件的**文件名**；
>
>    正则表达式用来匹配**文件中**符合条件的**字符串**；
>
> 2. 通配符是完全匹配；
>
>    正则表达式是包含匹配；
>
>    举例子：`ls aa`是完全一样的`aa`找出来这个文件名，一定是`aa`
>
>    `grep aa`则是包含`aa`这个字符串的，可以是`aa`自身，也可以是`aaxx`
>
> 3. `ls`/`find`/`cp`这些命令没法支持正则，只能使用shell的通配符来进行匹配；
>
>    `grep`/`awk`/`sed`这些命令可以支持正则；

## 基础正则表达式

---

|    元字符     |                   作用                   |                             例子                             |
| :-----------: | :--------------------------------------: | :----------------------------------------------------------: |
|       *       |     前一个字符匹配了0次或者任意多次      |     `a*`：匹配没有a或者多个a     |
|       .       |     匹配除了换行符以外的任意一个字符     | `.`：匹配除了换行符之外的任意一个字符 |
|       ^       |     匹配行首    |     `^a`：匹配以a开头的字符     |
|       $       |    匹配行尾     |        `a$`：匹配以a结尾的字符        |
| [] |        匹配中括号中指定的任意一个字符（只匹配一个字符）        |                  `[ab]`：匹配包含括号中的a或者b的一个字符                  |
| [^] | 匹配除了中括号中指定的字符以外的任意一个字符（只匹配一个字符） |             `[^ab]`：匹配除了括号中的a或者b以外的任意一个字符             |
|   \   |     转义符号（转换符号本身的含义，特殊符号就变普通，普通符号变特殊）     |    `\\w`：匹配包含`\w`字符串的字符    |
| \\{n\\}  |      表示其前面的字符恰好出现n次      |          `a{2}`：匹配包含a连续出现2次的字符串          |
| \\{n,\\} |      表示其前面的字符出现至少要n次      |             `a{2,}`：匹配包含a至少连续出现两次的字符串             |
| \\{n,m\\} |      表示其前面的字符出现至少要n次，最多只有m次      |             `a{2,4}`：匹配包含a至少连续出现2次，但是最多只能连续出现4次的字符串             |

注意：其实`a*`这种写法没啥意义，会列出所有内容的，因为`*`表示前边的字符可以没有。那么`a*`也可以表示无a的内容。综合来说就是`a*`既可以表示无a的内容，也可以表示有a的内容，就表示全部内容，因此没啥意义。

## 字符截取

---

### 截取指定行：grep

- grep：使用grep提取符合条件的行

### 截取指定列：cut/awk

- cut：使用cut提取符合条件的列

  ```shell
  # 使用cut去提取第一列和第三列，然后指定分隔符是冒号（看文件里头分隔符是啥这里就写啥）
  cut -d ":" -f 1,3 /etc/passwd
  ```

  ```shell
  root:0
  bin:1
  daemon:2
  adm:3
  lp:4
  sync:5
  ```

  ​ 实践：使用cut+grep组合获取普通用户的账户名

  ```shell
  # 1.普通用户和root用户的shell都是/bin/bash,其他的都不是，所以可以在/etc/passwd找出相应的行
  grep "/bin/bash" /etc/passwd |
  # 2.然后接着过滤掉root这一行：即取出不是root的那些行的内容就好
  grep -v root |
  # 3.然后提取指定的行中的指定列的内容
  cut -d ":" -f 1 
  ```

  cut命令局限：只能识别具体的制表符、逗号、冒号、句号，无法识别空格。如果是空格一定要使用，可以使用awk来完成。

- awk：使用awk提取符合条件的列

  学习使用`printf`，格式`printf '输出类型输出格式' 输出内容`

  ```shell
  awk '{print $1 "\t" $3}' student.txt
  ```

  ```shell
  ID gender
  001 F
  002 M
  ```

  在使用冒号作为分隔符的文件进行awk操作必须指定分隔符是冒号，否则直接截取是没啥意义的。这个时候就需要BEGIN关键词登场了，它的作用是在进行awk的其他操作时，做一下BEGIN指定的操作`BEGIN{xxx}`。比如，我们要截取`/etc/passwd`的内容，那么这个文件里头就是以冒号分割的，我们就要使用BEGIN首先给awk指定一下分隔符`BEGIN{FS:":"}`然后才进行余下的操作。

## 编辑器

---

### sed编辑器

格式：`sed [选项] -[动作] 文件名`

### vim编辑器

###
