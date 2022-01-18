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
   setfacl -m u:cjl:rx  file
   # 让file下的子文件也继承同样的acl权限
   setfacl -m d:u:cjl:rx file
  ```

- 针对某个组

  ```sh
   # setfacl -m g:组:读｜写｜执行
   setfacl -m g:fe:rwx file
   # 让file下的子文件也继承同样的acl权限
   setfacl -m d:g:fe:rwx file
  ```

`getfacl`的时候可以看到有一个mask字段，它是用来界定权限可允许生效的最大范围。也就是，如果mask只允许r写，那么就算你设置了rw，也只有r的权限，无法超越mask界定的权限最大范围。