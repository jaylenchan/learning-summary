访问nginx: pod ip + nginx容器端口 curl xxx:80
查看busybox容器日志：kubectl logs -f ed-nginx-busybox -n dev -c ed-busybox

volumes:
    - name: nfs-logs
      nfs:
        path: /root/data/nfs  # nfs存储服务器上存储路径
        server: 10.211.55.22  # server就是谁是nfs存储服务器

