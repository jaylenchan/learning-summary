<div align="center">
  <img
  src="https://github.com/jaylenchan/learning-summary/blob/main/pic/linux-acl%E6%9D%83%E9%99%90.png?raw=true" alt="ACL权限"/>
  <h1 align="center">
  ACL权限
  </h1>
</div>

- 针对某个用户
  
  ```sh
   # setfacl -m u:用户:读｜写｜执行
   setfacl -m u:cjl:rx 
  ```

- 针对某个组

  ```sh
   # setfacl -m g:组:读｜写｜执行
   setfacl -m g:fe:rwx
  ```
