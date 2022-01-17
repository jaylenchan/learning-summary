# ACL权限

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
