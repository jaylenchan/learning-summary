# git学习

## 版本控制

### 个人版本控制

### 团队版本控制

* 我（主工程师）搭建了项目的目录架构，把**代码提交**到了我的**本地仓库**
* 我（主工程师）在服务器创建了一个**远程仓库**
* 我（主工程师）再从**本地仓库**把我**提交进来的项目的目录架构**代码发送到**远程仓库**
* 同事A从**远程仓库里**将我（主工程师）项目的目录架构，克隆到同事A的本地仓库里
* 我和同事A从此刻开始同时开发这个项目

## 代码托管中心

### 分类

#### 局域网环境

gitlab

#### 外网环境

github

码云

### 作用

维护远程库

## Git 冲突

## Git报错

```powershell
# 出现问题
$ git push
remote: You do not have permission push to this repository
fatal: unable to access 'https://gitee.com/chen_pub/git_version_management.git/': The requested URL returned error: 403
```

```powershell
# 解决方法
1.控制面板->用户账户->凭据管理器->windows凭据
2.删除掉原来的旧有凭据（码云/GitHub）
3.重新git push
```

```powershell
# 解决结果
$ git push
libpng warning: iCCP: cHRM chunk does not match sRGB
Enumerating objects: 7, done.
Counting objects: 100% (7/7), done.
Delta compression using up to 4 threads
Compressing objects: 100% (5/5), done.
Writing objects: 100% (6/6), 677 bytes | 75.00 KiB/s, done.
Total 6 (delta 0), reused 0 (delta 0)
remote: Powered by GITEE.COM [GNK-5.0]
To https://gitee.com/chen_pub/git_version_management.git
   8d18259..f92789e  master -> master
```

## Git命令行操作

### 本地库操作

`ls -A` 查看当前的所有文件=隐藏文件+非隐藏文件

`ll -A`详细查看当前的所有文件=隐藏文件+非隐藏文件

`pwd`查看当前所在的文件路径

`:set nu`在vim编辑器里头让文本显示行号

`tail -n 3 new.txt`只查看new.txt文件的末尾3行文本

效果

```powershell
  1
  2 # Please enter the commit message for your changes. Lines starting
  3 # with '#' will be ignored, and an empty message aborts the commit.
  4 #
  5 # On branch master
  6 #
  7 # Initial commit
  8 #
  9 # Changes to be committed:
 10 #       new file:   new.txt
 11 #
```

#### 创建本地库

* `git init`创建一个新的本地库（其实就是创建.git目录）

```powershell
$ git init
Initialized empty Git repository in G:/个人练习/【07】工程化/Git/代码/git_demo01/.git/
```

* `git init` 效果

```powershell
$ ls -A
.git/
```

#### 查看本地库

```powershell
$ cd .git
$ ls
config  description  HEAD  hooks/  info/  objects/  refs/
```

#### 设置签名

```powershell
# 组成
user.name：chen_pub
user.email:chen_pub@qq.com（随便设置，不需要一定跟用户名一样的chen_pub开头）

# 作用
区分不同的开发人员

# 本地库签名设置和远程库所在的代码托管中心GitHub/码云上的用户名密码没有一点关系，随便设置

# 命令[至少设置一个级别]
  ## 项目仓库级别-仅在当前的项目中有效（优先级最高）
  git config user.name chen_pub
  git config user.email chen_pub@qq.com
  ## 系统用户级别-在整个操作系统下的所有项目都有效（优先级次之）
  git config --global user.name chen_pub
  git config --global user.email chen_pub@qq.com
```

#### 查看签名

###### 项目仓库级别签名

```powershell
$ cd .git
$ ls
config  description  HEAD  hooks/  info/  objects/  refs/
$ cat config
[core]
        repositoryformatversion = 0
        filemode = false
        bare = false
        logallrefupdates = true
        symlinks = false
        ignorecase = true
[user]
        name = chen_pub
        email = chen_pub@qq.com
```

###### 系统用户级别签名

```powershell
$ cd ~ 
$ ls -A
 .babel.json
 .bash_history
 .config/
 .gitconfig
$ cat .gitconfig
[user]
        name = chen_pub
        email = chen_pub@qq.com
[filter "lfs"]
        clean = git-lfs clean -- %f
        smudge = git-lfs smudge -- %f
        process = git-lfs filter-process
        required = true
```

#### 查看工作区、暂存区的状态

* `git status`效果1

```powershell
$ git status
On branch master # 当前查看的是主分支的状态

No commits yet   # 【本地仓库里】暂且还没有提交

nothing to commit (create/copy files and use "git add" to track)【暂存区里】暂且还没有要提交的东西 
## track追踪的理解：让git去管理这个文件
```

* `git status`效果2

```powershell
$ git status
On branch master  # 当前查看的是主分支的状态

No commits yet    # 【本地仓库里】暂且还没有提交

Untracked files:  # 没有被Git管理的文件出现
  (use "git add <file>..." to include in what will be committed)
  # 使用git add new.txt就可以让Git管理new.txt文件，把它放到暂存区待提交到本地库
        new.txt # new.txt就是没有被Git追踪的文件

nothing added to commit but untracked files present (use "git add" to track)
# 没有已经添加到暂存区等待提交到本地库的文件，但是现在出现了尚未被Git管理的文件
（请使用git add命令让这个文件被Git进行管理）
```

* `git status`效果3

```powershell
$ git status
On branch master # 当前查看的是主分支的状态

No commits yet   # 【本地仓库里】暂且还没有提交

Changes to be committed: # 【暂存区里的】更改即将被提交到【本地仓库里】
  (use "git rm --cached <file>..." to unstage)
# 使用 git rm --cached new.txt 把添加到暂存区里的new.txt拿出来
# 撤销完后，就会回到git status效果2
        new file:   new.txt
```

* `git status`效果4

```powershell
$ git status
On branch master # 当前查看的是主分支的状态
nothing to commit, working tree clean # 【暂存区里】没有要提交的东西，【工作区里】是干净的
```

* `git status`效果5

```powershell
$ git status
On branch master # 当前查看的是主分支的状态
Changes not staged for commit: # 【暂存区里】待提交的修改所对应的工作区文件又被修改了，但是还没有提交到【暂存区】
  (use "git add <file>..." to update what will be committed)
  # 使用git add new.txt更新【暂存区里】对应的文件修改
  (use "git checkout -- <file>..." to discard changes in working directory)
  # 使用git checkout -- new.txt 丢弃掉这一次工作区里头对new.txt文件的更改
        modified:   new.txt

no changes added to commit (use "git add" and/or "git commit -a")
# 没有已经是被添加到【暂存区里】等待进一步提交到【本地库】的更改
# 使用git add添加到暂存区，然后使用git commit 进一步提交到本地库
# 或者直接使用git commit -a 一步到位，添加+提交
```

#### 查看提交到本地库过的历史状态

```powershell
$ git log
# 提交 键名是一个哈希值： a5483b509d1c69ca6f1c2f9b60519c93deb57130
commit a5483b509d1c69ca6f1c2f9b60519c93deb57130 (HEAD -> master)# 当前版本就是由HEAD指针引用
# 键值是提交的相关信息
Author: chen_pub <chen_pub@qq.com> # 进行这次提交的user是chen_pub,email是chen_pub@qq.com
Date:   Thu Jun 25 17:18:47 2020 +0800 # 这次提交的时间是2020-6-25 17：18：47

    modified this txt # 提交的备注信息是：modified this txt

commit ef083a814f99bb08de236a9be03968a0138b9bae
Author: chen_pub <chen_pub@qq.com>
Date:   Thu Jun 25 17:00:24 2020 +0800

    first commit
```

```powershell
# 以oneline一行的漂亮格式去显示历史提交记录
$ git log --pretty=oneline
# 提交的名字 [HEAD->master（HEAD指向的就是当前版本）] 提交的备注
a5483b509d1c69ca6f1c2f9b60519c93deb57130 (HEAD -> master) modified this txt
ef083a814f99bb08de236a9be03968a0138b9bae first commit
```

```powershell
# 以oneline一行的格式，并且哈希键名只显示一部分的格式去显示历史提交记录
$ git log --oneline
a5483b5 (HEAD -> master) modified this txt
ef083a8 first commit
```

```powershell
# 以一行的格式展示历史提交记录，并且将回到某个历史版本需要走的步数列举了出来HEAD@{n}
$ git reflog
# 提交的名字 [HEAD->master] 回到某个版本需要移动的步数 提交的备注
a5483b5 (HEAD -> master) HEAD@{0}: commit: modified this txt
ef083a8 HEAD@{1}: commit (initial): first commit
```

#### 根据历史状态记录使用某个历史版本

```powershell
$ git reset --hard ef083a8 使用版本ef083a8
HEAD is now at ef083a8 first commit
## 再次查看git log-发现另一个版本没有了【就是未来的版本没有了，看不到了】
$ git log
commit ef083a814f99bb08de236a9be03968a0138b9bae (HEAD -> master)
Author: chen_pub <chen_pub@qq.com>
Date:   Thu Jun 25 17:00:24 2020 +0800

    first commit
## 再次查看git reflog-发现比之前多了一条记录【压栈，往上压了一条记录，查看移动版本步数会发现增加了】
$ git reflog
ef083a8 (HEAD -> master) HEAD@{0}: reset: moving to ef083a8
a5483b5 HEAD@{1}: commit: modified this txt
ef083a8 (HEAD -> master) HEAD@{2}: commit (initial): first commit
```

```powershell
# git log 和 git reflog的区别
git log = 现在版本+过去版本
git reflog = 未来版本+现在版本+过去版本
因此，使用了一个旧版本
1.用git log查看，看到的是当前旧版本开始往后的记录
2.用git reflog查看，看到的是所有版本
git log更像是数组中的截取slice操作，直接从某个当前位置截取到末尾了
git reflog更像是各种操作的记录
```

#### 找回删除的文件

```powershell
# 删除new.txt【只要操作了文件，就会产生一个新历史】
$ rm new.txt
$ git status【查看一下删除后工作区的状态】
On branch master
Changes not staged for commit:【结果告诉我们有尚未被添加到暂存区以提交到本地库的更改】
  (use "git add/rm <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        deleted:    new.txt【该更改就是我们删除了new.txt】

no changes added to commit (use "git add" and/or "git commit -a")
$ git add .【于是我们先把这个历史时刻添加到暂存区】
$ git status【重新查看一下master上的状态】
On branch master
Changes to be committed:【发现提示消息变成了：暂存区里有历史时刻等待提交到本地库里】
  (use "git reset HEAD <file>..." to unstage)

        deleted:    new.txt
$ git commit -m "delete new.txt"【于是将暂存区的历史时刻提交到本地库】
[master 42e4ead] delete new.txt
 1 file changed, 2 deletions(-)
 delete mode 100644 new.txt
$ git status【然后重新查看当前master的状态】
On branch master
nothing to commit, working tree clean 【发现暂存区没有要提交的历史时刻，同时工作区也是干净的】
$ git log --oneline【于是我们接着打开历史提交记录】
42e4ead (HEAD -> master) delete new.txt【发现当前的历史版本是在我们删除完new.txt后的这个历史版本】
5f241aa create a.txt
a5483b5 modified this txt
ef083a8 first commit
$ git reset --hard 5f241aa【为了找回new.txt，我们选择使用之前的历史版本，于是回到了存在new.txt的那个版本】
HEAD is now at 5f241aa create a.txt
$ ls【检查当前的文件，发现new.txt回来了，事实是我们其实是回到了这个历史时刻】
a.txt  new.txt
```

#### 撤销已经提交到暂存区的修改

`git reset --hard HEAD`

```powershell
$ touch b.txt
$ git status
On branch master
Untracked files:
  (use "git add <file>..." to include in what will be committed)

        b.txt

nothing added to commit but untracked files present (use "git add" to track)
$ git add b.txt
$ git status
On branch master
Changes to be committed:
  (use "git reset HEAD <file>..." to unstage)

        new file:   b.txt
$ git reset --hard HEAD
HEAD is now at 5f241aa create a.txt
$ ls
a.txt  new.txt
$ git status
On branch master
nothing to commit, working tree clean
$ git log
commit 5f241aaf5a5c72d42b92ca05cbd2f8e157117f98 (HEAD -> master)
Author: chen_pub <chen_pub@qq.com>
Date:   Thu Jun 25 19:14:55 2020 +0800

    create a.txt

commit a5483b509d1c69ca6f1c2f9b60519c93deb57130
Author: chen_pub <chen_pub@qq.com>
Date:   Thu Jun 25 17:18:47 2020 +0800

    modified this txt

commit ef083a814f99bb08de236a9be03968a0138b9bae
Author: chen_pub <chen_pub@qq.com>
Date:   Thu Jun 25 17:00:24 2020 +0800

    first commit
$ git reflog
5f241aa (HEAD -> master) HEAD@{0}: reset: moving to HEAD
5f241aa (HEAD -> master) HEAD@{1}: reset: moving to 5f241aa
42e4ead HEAD@{2}: commit: delete new.txt
5f241aa (HEAD -> master) HEAD@{3}: commit: create a.txt
a5483b5 HEAD@{4}: reset: moving to a5483b5
ef083a8 HEAD@{5}: reset: moving to ef083a8
a5483b5 HEAD@{6}: commit: modified this txt
ef083a8 HEAD@{7}: commit (initial): first commit
```

```powershell
# 删除文件找回方式
## 删除的整个操作形成的新历史修改已经提交到本地库
git reset --hard 存在删除文件的某个版本
## 删除的整个操作形成的新历史修改只添加到了暂存区
git reset --hard HEAD
```

#### 查看历史版本之间文件之间的差异

```powershell
$ vim a.txt # 修改工作区的文件a.txt后
$ git diff a.txt # 然后查看修改前后工作区中a.txt的差别
warning: LF will be replaced by CRLF in a.txt.
The file will have its original line endings in your working directory
diff --git a/a.txt b/a.txt
index e69de29..074fcb8 100644
--- a/a.txt
+++ b/a.txt
@@ -0,0 +1 @@
+111111111111111111111111111111
```

#### 分支操作

```powershell
# 创建分支
# 查看分支
# 切换分支
# 合并分支
# 修复两个分支修改了同一个地方合并时发生冲突的问题
```

### 远程库操作

#### 创建远程库

```powershell
# 码云或者GitHub新建一个仓库就是一个远程库
```

#### 将本地库关联远程库

`git remote add origin 远程库的地址`

```powershell
# git remote add origin 远程库的地址
给项目添加一个远程库，并且将远程仓库的路径更改为origin，推送的时候就不需要写一个很长的地址，直接git push origin 分支名就OK了！ 
```

#### 从远程库克隆代码到本地库

`git clone 远程库的地址`

```powershell
# 什么时候用？
新成员需要帮忙开发一个项目，该项目该成员本地没有
# git clone的三个效果
## 效果1：将项目从远程库克隆到本地
## 效果2：在本地自动关联远程库`git remote add origin 远程库的地址`
## 效果3：初始化了本地库`git init`
```

#### 拉取远程库的代码到本地库

`git pull`

```powershell
# git pull的效果
## git fetch 远程库地址 分支名
## Git merge
```

```powershell
# git pull产生的冲突问题
## 如果A先push，B不是在git pull后再在新版本的基础上去修改内容，而是B直接就在之前的旧版本的基础修改，这样子造成的结果是A和B如果同时修改了一个文件中的同一个内容，先后push的话就造成了冲突。当git pull下来的时候，就会出现merge问题，需要自己去解决这个问题
```

### 跨团队合作

* B团队fork A团队的远程库一份【结果就是A团队和B团队各有一个长得一样的远程库】
* 于是从以后开始，B团队对自己fork下来的这个远程库进行拉取，然后代码开发，再推送【其实又回到了团队内合作的流程】
* 当B团队开发完毕之后，就提pull request，申请代码合并
* A团队看到pull request之后，就可以对代码进行审核，审核通过merge

### 分支实战

```powershell
# 为什么要有分支开发呢？
一个场景是初级工程师代码程度不到位，如果将master分支交由他们开发，结果是大家开发完成全部都往远程的master推送，如果初级工程师有什么错误被推送到远程master，整个开发环境就被污染了。
# 解决办法：初级前端工程师在本地新建一个分支chen_pub
## 当chen_pub在本地新建的分支chen_pub上开发的时候，就可以随意按照自己的习惯行为去开发代码
## 当chen_pub在分支chen_pub开发完毕之后，就可以推送到远程库里头，在远程库新增加一条分支叫做chen_pub
## 前端主管在检查任务的时候，就可以从远程库将chen_pub这条分支拉取下来，查看初级工程师chen_pub开发的代码
## 如果说chen_pub分支上的代码没有问题，前端主管才merge这条分支上的内容，然后再推送到远程master开发环境上
## 如果说chen_pub分支上的代码有问题，前端可以不理会甚至删除这条分支上的内容，让chen_pub重新开发
```

# Git开发规范

## branch规范

```bash
# master分支（生产分支）
@作用 用于生产环境部署
@限制 不允许任何人修改这条分支或者提交代码到这条分支，只允许高级工程师或者总监合并develop或者hotfix分支的代码到这条分支
# develop分支（开发大分支）
@作用 用于开发环境开发代码
@限制 始终保持这条分支上的代码都是以下几种代码
 $ 最新完成的代码
 $ bug修复后的代码
# feature分支（开发小分支）
@作用 开发环境下开发新功能
@限制 分支需要以develop分支为基础进行创建
@命名 feature/xxx_module
# release分支（测试分支）
@作用 测试环境发布提测
# hotfix分支（修复分支）
@作用 用于生产环境线上出现紧急问题需要及时修复
@限制 以master分支为基础创建，修复完成之后需要分别合并到master和develop分支（因为master本身是从develop合并的）
$ 个人疑问：直接修复hotfix分支合并到master难道不会出现修复失败的情况吗？为什么不是先合并回develop然后提测到release，再合并到master
@命名 hotfix/bug编号
```

## commit规范

```bash
# 好处
@加快code review流程
@帮助编写良好的版本发布日志
@方便维护者查看了解代码出现的特定变化和feature添加的原因
# 格式（Angular Git Commit Guidelines）
 <commit的类型>: <commit的主旨>
 <blank-line>
 <commit的内容>
 <blank-line>
 <commit描述与之相关的issue等>
 $ 每一行不可以超过72字符！！！
# commit的类型
@feat 添加新的特性
@fix 修复bug
@docs 仅仅修改了文档
@style 仅仅修改了空格/缩进，没有改变代码逻辑
@refactor 代码重构，没有添加新的功能或者修复bug
@perf 增加代码进行性能测试
@test 增加测试用例
@chore 改变构建流程，增加依赖库/工具等
# commit的内容
@为什么要变更这次的代码？
@怎么解决这个问题的？-具体描述下问题的步骤
@这种结局方式是否存在副作用？
# commit相关联的issue（如果有的话）
@issue的地址
```

# Gitlab

## 开发流程

```bash
# 项目组长负责创建仓库
@组长在gitlab创建一个远程库survey(APP)
@组长将远程库的survey(APP)拉取下来
`git clone survey(APP)的仓库地址`
@组长在本地创建delvelop分支（默认拉取下来的是master）
`git checkout -b develop`
@组长在本地将所有分支push到远程库
`git push -all`
@组长在gitlab上添加项目开发成员
`Settings->Members->Invite member`
# 项目组长分配里程碑
`Issues->Milestones->New Milestones`
@里程碑就是多个任务的一个总集合，标定了从什么时候开始到什么时候结束完成一个任务集合的开发
@由于是任务集合，所以在创建里程碑之后的接下来步骤就是去创建各个任务
# 项目组长创建里程碑里的各个任务
`Issues->List->New issue`
@编写任务（任务可以是bug，task，idea）
@指派开发人员
@指定所属里程碑
# 被指派任务的成员便可以看到自己被分配的任务
# 开发成员参与开发，完成任务
@拉取远程库到本地
`git clone survey(APP)的仓库地址`
@创建功能新分支feature/task
@完成组长分配的任务
`git add .`
`git commit -m "finish task"`
`git push origin feature/task`
$ 提交feature/task到远程的好处是保存代码，万一本地丢失了没了就麻烦了！
@创建请求合并到develop分支提交请求合并
`Merge Requests->New Merge Request`
@书写title
$ title的书写要思考如何将本次请求跟自己被分配到的任务关联起来，比如title是：我完成了task#1
@书写阐述
@指派人员（合并分支的权利只在一些主管手中）
@指定本任务所属里程碑
@指定标记（功能模块）
@指定源分支（feature/task）
@指定合并到哪条分支（develop）
@提交合并请求
# 项目组长进行请求合并审核
@查看要合并的请求
@审核要合并的请求（code review）
@如果代码🈶️问题就@他，发comment
# 开发成员收到审核不通过的消息
@重新修改feature/task，然后重新提交
`git add .`
`git commit -m "rewrite the task"`
`git push --set-upstream origin feature/task`
$ 指定完上流分支后下一次直接就git push就行
# 项目组长重新查看合并的请求
@审核这一次成员提交到这条准备要合并分支的代码
@发现代码没问题同意合并请求
$ 同意完合并请求后，功能分支feature/task就会被删除了
@关闭该次合并请求
# 开发成员做后续处理
@到自己的代办事项中点击完成该任务
@到本地，在本地进行rebase
`git pull --rebase origin`
@切换到任务分支feature/task
`git checkout feature/task`
@查看确认该功能分支代码确实完成后，切换回develop分支
`git checkout develop`
@关闭该任务功能分支
`git branch -d feature/task`
# 后续
@查看图表
`Repository->Graph->选择指定分支查看提交情况`
```

# Gitflow

## 工作流程

1.完成一组feature功能

2.合并feature到develop分支

3.进入测试阶段，创建release分支

4.测试过程中存在bug，直接在release分支上进行修复并提交

5.测试完成后，合并release分支到master和develop分支

6.此时的master分支应该是最新的，稳定的代码，部署上线
