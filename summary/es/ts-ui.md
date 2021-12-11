## 项目初始化准备

- 全局安装`lerna`：` npm install lerna -g` 

- 使用`lerna`生成项目`package.json`

  `lerna init`后，项目就初始化成功了。我们可以看到项目初始化之后的`ts-ui`项目结构如下

  ```tsx
  ├── lerna.json
  ├── package.json
  └── packages
  ```

  - `lerna.json`

    ```tsx
    {
      "packages": [
        "packages/*"
      ],
      "version": "0.0.0"
    }
    
    ```

    `lerna.json`的作用是告诉我们管理的项目在`packages`目录下边的所有项目。

- 指定项目依赖包安装工具：到`lerna.json`当中去指定我们的依赖包安装的客户端（即`npm`,`cnpm`,`yarn`），告诉`lerna`我们需要使用`yarn`去管理我们项目的依赖包

  ```tsx
  {
    ”npmClient“: "yarn"
  }
  ```

- 指定`workspaces`工作目录：到`package.json`当中去定义工作目录在哪里

  ```tsx
  {
    workspaces: [
      "packages/*"
    ]
  }
  ```

- 告诉`lerna`使用`yarn`的`workspaces`管理项目

  ```tsx
  {
    useWorkspaces: true
  }
  ```

- 指定项目类型，在`package.json`

  ```
  {
    "private": true
  }
  ```

- 使用`yarn`生成项目：`yarn `
