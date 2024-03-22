# 使用官方 nginx 镜像作为基础镜像
FROM nginx:alpine

# 将网站的静态文件复制到容器的 nginx 服务目录下
COPY . /usr/share/nginx/html

# 暴露 80 端口
EXPOSE 80
