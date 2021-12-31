# Remote Development

## Remote - SSH

- **安装Remote SSH**

  打开VSCode，找到插件菜单搜索栏搜索“Remote-SSH”并安装

  ![img](https://github.com/jaylenchan/learning-summary/blob/main/pic/Remote%20Development-%E6%90%9C%E7%B4%A2remote-ssh.png?raw=true)

  安装完毕后，你的VSCode左侧会多出一个电脑💻的图标菜单，点击该菜单如果展示的是如下面板就证明你安装Remote SSH成功，接下来我们要使用这个插件去连接我们的远程主机！

  ![img](https://github.com/jaylenchan/learning-summary/blob/main/pic/Remote%20Development-remote%E8%8F%9C%E5%8D%95.png?raw=true)

- **连接远程主机**

  找到**SSH TARGETS**文案，点击右侧的**+**，就会展示如下面板

  ![img](https://github.com/jaylenchan/learning-summary/blob/main/pic/Remote%20Development-ssh%E8%BF%9E%E6%8E%A5%E8%BF%9C%E7%A8%8B%E4%B8%BB%E6%9C%BA.png?raw=true)

  接下来我们就可以在input框中使用ssh协议配置我们的远程主机了，面板如下

  ![img](https://github.com/jaylenchan/learning-summary/blob/main/pic/Remote%20Development-ssh%E5%8D%8F%E8%AE%AE%E8%BF%9E%E6%8E%A5%E8%BE%93%E5%85%A5.png?raw=true)

  输入ssh协议**配置**你的主机，格式：`ssh 用户名@远程主机ip`（只是配置，而不是连接），确认后回车后，会接着展示如下面板

  ![img](https://github.com/jaylenchan/learning-summary/blob/main/pic/Remote%20Development-ssh%20config%E7%AE%A1%E7%90%86%E9%85%8D%E7%BD%AE.png?raw=true)

  这个面板会询问你的ssh配置信息要存放到哪里去？这里我们选择放到自己本地机子的`.ssh`目录下，这个配置的名字就叫做`config`，即`/Users/jaylen/.ssh/config`，这里头存放的就是你的ssh配置信息。选择好后，回车，会接着展示如下面板

  ![img](https://github.com/jaylenchan/learning-summary/blob/main/pic/Remote%20Development-%E8%BF%9C%E7%A8%8B%E4%B8%BB%E6%9C%BA%E6%B7%BB%E5%8A%A0%E6%88%90%E5%8A%9F.png?raw=true)

  看到右下角，这里会提示你**Host added!**。在这个弹窗中，我们选择**connenct**连入远程主机。到这里，我们可以说只是完成了基本配置。**实际上**并没有真正连接到远程主机当中。真正连接主机的步骤是在要打开远程主机的某个文件夹时，才会要求你输入连接远程的密码，那时候才是真正连接远程主机。

  首先将光标移动到显示远程主机列表，这里是**10.211.55.3**，你会发现光标悬浮的时候，右侧会展示出文件夹的图标

  ![img](https://github.com/jaylenchan/learning-summary/blob/main/pic/Remote%20Development-%E5%85%89%E6%A0%87%E7%A7%BB%E5%8A%A8%E6%98%BE%E7%A4%BA%E6%96%87%E4%BB%B6%E5%A4%B9%E5%9B%BE%E6%A0%87.png?raw=true)

  点击该文件夹图标，意思是打开某一个远程主机上的文件（其实前置步骤就是顺便就把远程主机连接上了），点击下去就会弹出新的VSCode面板

  ![img](https://github.com/jaylenchan/learning-summary/blob/main/pic/Remote%20Development-%E6%89%93%E5%BC%80%E8%BF%9C%E7%A8%8B%E4%B8%BB%E6%9C%BA%E6%96%87%E4%BB%B6.png?raw=true)

  输入你的远程主机账号密码之后，你就登录了远程主机，面板如下

  ![img](https://github.com/jaylenchan/learning-summary/blob/main/pic/Remote%20Development-%E6%AD%A3%E5%BC%8F%E7%9C%9F%E6%AD%A3%E8%BF%9E%E5%85%A5%E8%BF%9C%E7%A8%8B%E4%B8%BB%E6%9C%BA.png?raw=true)

  可以看到左上角的文案：**已连接到远程**，恭喜你已经连入了远程主机，接下来我们就可以在VSCode上打开你的远程文件了。

  

## Remote - Container

## Remote - WSL

