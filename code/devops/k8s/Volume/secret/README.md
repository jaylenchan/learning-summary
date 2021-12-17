查看命名空间dev下面的secret，名字叫做nginx-secret
kubectl describe -n dev secret nginx-secret

进入容器
kubectl exec -n dev secret-nginx -it -c secret-nginx /bin/bash
