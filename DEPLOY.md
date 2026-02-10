# GitHub Pages 部署指南 - 自定义域名版本

## 🌐 使用自定义域名 10btc.top

### 已完成的配置：

1. ✅ Next.js 静态导出（`output: 'export'`）
2. ✅ GitHub Actions CI/CD 自动部署
3. ✅ CNAME 文件（指向 10btc.top）
4. ✅ 无 basePath（使用根路径）

---

## 📋 部署步骤

### 1. GitHub Pages 配置

访问：https://github.com/coolzeta/10btc/settings/pages

**配置如下：**
- **Source**: 选择 **"GitHub Actions"**
- **Custom domain**: 输入 `10btc.top`
- **Enforce HTTPS**: 建议勾选（等 DNS 生效后）

### 2. DNS 配置

在你的域名服务商（如阿里云、Cloudflare 等）设置 DNS：

#### 方案 A：使用 A 记录（推荐）

添加以下 4 条 A 记录，指向 GitHub Pages 的 IP：

```
类型    名称    值
A       @       185.199.108.153
A       @       185.199.109.153
A       @       185.199.110.153
A       @       185.199.111.153
```

#### 方案 B：使用 CNAME 记录

如果你想用 www 子域名：

```
类型      名称    值
CNAME     www     coolzeta.github.io
```

然后在 GitHub Pages 设置中填写 `www.10btc.top`

### 3. 等待 DNS 生效

- DNS 生效时间：5分钟 - 48小时（通常 10-30 分钟）
- 检查是否生效：
  ```bash
  # Mac/Linux
  dig 10btc.top
  
  # Windows
  nslookup 10btc.top
  ```

### 4. 启用 HTTPS

DNS 生效后：
1. 返回 GitHub Pages 设置
2. 勾选 **"Enforce HTTPS"**
3. 等待 SSL 证书自动配置（通常几分钟）

---

## 🔄 自动更新流程

修改代码后，只需：

```bash
git add .
git commit -m "你的更新说明"
git push
```

GitHub Actions 会自动：
- ✅ 构建 Next.js 静态文件
- ✅ 部署到 GitHub Pages
- ✅ CNAME 文件会被保留

---

## 🌍 访问网站

配置完成后，访问：
- **主域名**: https://10btc.top
- **www 子域名**（如果配置了）: https://www.10btc.top

---

## 🛠️ 故障排查

### DNS 未生效
```bash
# 检查 DNS
dig 10btc.top

# 应该看到指向 GitHub Pages IP 的 A 记录
```

### GitHub Pages 显示 404
1. 确认 `public/CNAME` 文件存在且内容为 `10btc.top`
2. 检查 GitHub Pages 设置中的 Custom domain
3. 查看 Actions 构建日志

### HTTPS 证书错误
1. 等待 DNS 完全生效（可能需要几小时）
2. 在 GitHub Pages 设置中点击 "Remove" 然后重新添加域名
3. 等待证书自动配置

### 样式丢失或资源 404
确认：
- ✅ `next.config.ts` 中 `basePath` 为空字符串
- ✅ `public/.nojekyll` 文件存在

---

## 📊 当前配置摘要

```
仓库: https://github.com/coolzeta/10btc
域名: 10btc.top
部署方式: GitHub Actions
构建命令: npm run build
输出目录: out/
```

---

## 🔧 本地测试

```bash
# 开发模式
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npx serve out
```

---

## 📝 DNS 配置示例（各平台）

### 阿里云

1. 登录阿里云控制台
2. 域名 → 解析设置
3. 添加 A 记录：
   - 记录类型：A
   - 主机记录：@
   - 记录值：185.199.108.153（重复添加4个IP）
   - TTL：10分钟

### Cloudflare

1. 登录 Cloudflare
2. DNS → Add record
3. 添加 A 记录（关闭橙色云朵代理）：
   - Type: A
   - Name: @
   - IPv4 address: 185.199.108.153
   - TTL: Auto
   - 重复添加其他3个IP

### 腾讯云 DNSPod

1. 登录 DNSPod 控制台
2. 添加记录
3. 记录类型：A
   - 主机记录：@
   - 记录值：185.199.108.153
   - 重复添加其他3个IP
