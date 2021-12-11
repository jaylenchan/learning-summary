## 设置中文

- 下载插件`Locale plugin`

- 下载插件`Localization: Chinese (Simplified)`

- 重新启动`Jenkins`：`systemctl restart jenkins`

- `Manage Jenkins` -> `Configure System`-> `Locale`输入值：`zh_CN`，然后将`Ignore browser preference and force this language to all users`框勾选上，`Apply`应用配置

- 解决部分汉化问题：

  安装好插件“Locale plugin”和“Localization: Chinese (Simplified)后，先设置为zh_US重新启动，再设置回来

  其他插件重启Jenkins后，又出现了部分中文简体不翻译的情况。

  方法如下，可以完美修复。

  1. 将语言设定为zh_US，Jenkins切换为英文。
  2. 调用restart重启Jenkins：http://域名/restart。
  3.  再次语言设定为zh_CN，刷新即可。

## 权限管理

- 下载插件：Role-based Authorization Strategy

- 配置策略：Manage Jenkins ->Configure Global Security找到“授权策略”，选择Role-Based Strategy

- 创建角色：Manage Jenkins -> Manage and Assign Roles -> Manage Roles

  > Global Roles：给专门管理jenkins这个软件本身的人去分配角色权限使用的。
  >
  > Item roles：给项目分配角色权限使用的。我们希望不同的项目被不同的人员所访问。
  >
  > Node roles：jenkins使用主从节点模式的时候使用的

- 添加Global Roles：选择“Role to Add” -> 填入“base” -> 然后点击"Add"添加一个base角色。之后再在Global roles里头找到overall权限组，给base角色☑️勾选上read。这样子一来角色base就拥有了基本的登录jenkins的权限了。

- 添加Item Roles：添加两个Item Roles，然后分配给Item Roles指定的Items Role权限。实际应用当中，可以以一条业务线作为item Role。比如esmatch业务线，wisdom业务线，这样子被分配到不同业务线的人都可以看到不同的项目

- 保存退出角色创建，角色创建完成。

- 添加jenkins用户：Manage Jenkins -> Manage Users -> 新建用户

  ```shell
  1. 创建用户csy
  2. 创建用户cjl
  ```

- 尝试登录Jenkins：结果发现两个人都没有登录jenkins的权限

- 分配基本权限给用户：Manage Jenkins -> Manage and Assign Roles -> Assign Roles

  1. 找到“User/group to add”，分别将csy,cjl加入
  2. 在“Global Roles”部分，分别给csy,cjl都勾选上角色，分配上对应的角色，就拥有了对应的权限。于是重新尝试登录，就发现csy,cjl都能登录上了。但是到此，也只有基本的登录权限，项目查看的权限是没有的，所以看不到什么项目。

- 分配项目权限

  1. 给csy分配wisdom的Item Role角色权限，这样子她登录的时候就只能看到wisdom这条线的东西。
  2. 给cjl分配esmatch的Item Role角色权限，这样子她登录的时候就只能看到esmatch这条线的东西。

## 凭证管理

- 下载插件：Credentials

  > Username with password： 使用登录的用户名和密码作为凭证（比如Jenkins需要去gitlab拉取代码，那么就需要登录gitlab的用户名和密码。）
  >
  > SSH Username with private key：使用SSH key作为访问凭证。

###      SSH Username with private key访问gitlab

1. 在jenkins所在的服务器(docker-container)当中生成`ssh-keygen -t rsa`，将生成的公钥放入gitlab当中，将生成的私钥在jenkins的凭据当中填入。
2. 在凭据当中，选择SSH Username with private key，Username填入的是当前在服务器上使用哪个用户运行的ssh-key命令生成的那个人，这里是root。然后点击directly key，将私钥填入即可。
3. 测试jenkins能够成功访问gitlab拉取代码。

## 脚本管理

我们可以使用Jenkinsfile管理我们的脚本，带代码推送到gitlab的时候，Jenkins就会拉取gitlab代码的时候寻找Jenkinsfile脚本来执行。

## 触发构建

- 下载插件 gitlab
- gitlab方面：在项目下配置webhook钩子，钩子格式`http://10.211.55.21/project/项目名`

## 项目拉取

- 下载插件：Git Plugin

1. 在jenkins当中创建一个项目，然后配置Branch Sources处选择Git选择项（只有安装了Git Plugin才有这个）
2. Project Repository填入gitlab的项目地址
3. Credentials创建一个凭证，它的功能相当于你去登录gitlab需要账号密码，于是可以选择创建with  Username with Password创建用户密码凭证，然后在描述的地方给这个凭证取名，就叫做：gitlab-root-auth
4. 选择凭证gitlab-root-auth(自己取的凭证名字)
5. 应用保存
6. 测试效果，尝试点击Scan Multibranch Pipeline Now后，发现项目拉取成功了！

## 代码审查

- 安装插件： SonarQube Scanner
- 插件作用：用来联通Jenkins和SonarQube，让Jenkins调用SonarQube进行代码审查



