访问nginx: pod ip + nginx容器端口 curl xxx:80
查看busybox容器日志：kubectl logs -f hp-nginx-busybox -n dev -c hp-busybox

volumes:
    - name: hp-logs
      hostPath:
        path: /root/logs
        type: DirectoryOrCreate

这里头的/root/logs是指的是真正pod执行的那个工作节点所在的路径而不是master节点。利用这个存储方式可以将数据持久化存储到磁盘上。