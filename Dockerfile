# ===== 构建阶段 =====
FROM nginx:alpine

# 删除默认配置
RUN rm /etc/nginx/conf.d/default.conf

# 写入自定义配置（含 gzip 压缩）
COPY deploy.conf /etc/nginx/conf.d/default.conf

# 复制站点文件
COPY . /usr/share/nginx/html

# 暴露端口
EXPOSE 80

# 启动
CMD ["nginx", "-g", "daemon off;"]
