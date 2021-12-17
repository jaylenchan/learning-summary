# 流程控制

## 条件语句

### if语句

#### 单分支

```?shell
if [ 判断式 ]; then（then写一块，判断式之后就要加';'）
  程序
fi
```

或者

```?shell
if [ 判断式 ]
  then
    程序
fi
```

#### 多分支

```?shell
if [ 判断式 ]; then（then写一块，判断式之后就要加';'）
  程序
else
  程序
fi
```

### case语句

```?shell
case $变量名 in
  "val1")
    程序1
    ;;
  "val2")
    程序2
    ;;
  "val3")
    程序3
    ;;
  "*")
    都不是的程序4
    ;;
esac
```

## 循环语句

### for循环

```?shell
for 变量名 in val1 val2 val3(注意：这里的变量名不需要加`$`，因为这里只是变量定义)
  do
    程序(注意：这里如果要使用i必须要加`$`，因为这里是变量使用)

  done
```

或者

```?shell
for ((i = 0; i < 10; i++))
  do
    程序(注意：这里如果要使用i必须要加`$`，因为这里是变量使用)
  done
```

### while循环

```?shell
while [ 判断式 ]
  do
    程序
  done
```

### until循环

```?shell
until [ 判断式 ]
  do
    程序
  done
```

while和until的区别是：while的意思是如果x，就x。而until的意思就是如果不x，就x。
