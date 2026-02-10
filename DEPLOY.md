# GitHub Pages 部署指南

## 自动部署配置

本项目已配置 GitHub Actions 自动部署到 GitHub Pages。

### 步骤 1: 创建 GitHub 仓库

1. 访问 https://github.com/new
2. 创建新仓库，名称建议为 `10btctotop`
3. 不要初始化 README、.gitignore 或 license（本地已有）

### 步骤 2: 关联远程仓库

```bash
git remote add origin https://github.com/YOUR_USERNAME/10btctotop.git
```

### 步骤 3: 提交并推送代码

```bash
# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: Bitcoin website with animations and SEO"

# 推送到 GitHub
git push -u origin main
```

### 步骤 4: 配置 GitHub Pages

1. 访问仓库的 Settings → Pages
2. 在 "Source" 下选择 **GitHub Actions**
3. 保存设置

### 步骤 5: 自动部署

推送代码后，GitHub Actions 会自动：
- ✅ 安装依赖
- ✅ 构建 Next.js 项目
- ✅ 生成静态文件
- ✅ 部署到 GitHub Pages

查看部署状态：访问仓库的 "Actions" 标签页

### 访问网站

部署成功后，网站将在以下地址访问：
```
https://YOUR_USERNAME.github.io/10btctotop/
```

### 自动更新

每次推送到 `main` 分支时，网站会自动重新构建和部署：

```bash
# 修改代码后
git add .
git commit -m "Update content"
git push
```

## 配置说明

### next.config.ts
- `output: 'export'` - 启用静态导出
- `images.unoptimized: true` - 禁用图片优化（静态导出需要）
- `basePath: '/10btctotop'` - 设置 GitHub Pages 子路径

### .github/workflows/deploy.yml
GitHub Actions 工作流配置：
- 触发条件：push 到 main 分支
- 构建步骤：安装依赖 → 构建 → 上传
- 部署步骤：部署到 GitHub Pages

## 本地预览

```bash
# 开发模式
npm run dev

# 构建静态文件
npm run build

# 预览构建结果
npx serve out
```

## 故障排查

### 构建失败
检查 GitHub Actions 日志：仓库 → Actions → 选择失败的 workflow

### 404 错误
确保：
1. GitHub Pages 已启用
2. Source 设置为 "GitHub Actions"
3. basePath 配置正确

### 样式丢失
确认 `public/.nojekyll` 文件存在

## 自定义域名（可选）

1. 在仓库 Settings → Pages → Custom domain 添加域名
2. 在域名 DNS 设置中添加 CNAME 记录指向 `YOUR_USERNAME.github.io`
3. 更新 `next.config.ts` 中的 `basePath` 为空字符串
4. 更新 `app/sitemap.ts` 中的 URL
