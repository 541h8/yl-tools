# 🐉 游龙工具集

> 基于游龙开源项目构建的纯前端网页工具箱 · 32 个实用工具 · 完全离线 · 隐私零上传

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Tools](https://img.shields.io/badge/tools-32-brightgreen.svg)](#功能清单)
[![Rules](https://img.shields.io/badge/ad--rules-213682-orange.svg)](#游龙核心)

## ✨ 特性

- **32 个工具**，覆盖计算、换算、文本、编码、开发、设计、网络、趣味、生活、游龙核心等分类
- **213,682 条真实广告拦截规则**，源自 AdGuard / Peter Lowe 等公开规则库
- **6 套主题**：赛博（默认）、浅色、翠绿、日落、极简、深海
- **完全离线**：双击 `index.html` 即用，断网也能跑
- **零依赖**：无框架、无 CDN、无构建步骤
- **隐私优先**：所有计算在浏览器本地完成，数据不上传任何服务器

## 🚀 快速开始

### 本地使用

双击 `index.html` 即可在浏览器打开，手机电脑通用。

### 本地预览（推荐开发者）

```bash
# 方式一：Python
python3 -m http.server 8080

# 方式二：Node
npx serve .
```

访问 `http://localhost:8080` 即可。

## 📦 功能清单

### 🧮 计算（4）
| 工具 | 说明 |
|---|---|
| 计算器 | 科学计算与算式解析 |
| 百分比计算 | 占比 / 增减 / 差值 / 变化率 |
| 进制转换 | 2/8/10/16 进制互转 |
| 代码格式化 | HTML/CSS/JS 缩进整理 |

### 🔄 换算（1）
| 工具 | 说明 |
|---|---|
| 单位换算 | 长度/重量/面积/温度/速度/存储 |

### 📝 文本（4）
| 工具 | 说明 |
|---|---|
| 文本处理 | 统计/大小写/去重/排序/行号 |
| 批量文本处理 | 前缀/编号/查找替换/拆列 |
| 换行符转换 | CRLF / LF / CR 互转 |
| 占位文本 | Lorem Ipsum 中英文生成 |

### 🔐 编码（4）
| 工具 | 说明 |
|---|---|
| URL 编解码 | 编码/解码/参数解析 |
| Base64 | 文本与 Base64 互转 |
| 图片转 Base64 | 本地转换，不上传 |
| 哈希计算 | MD5 / SHA1 / SHA256 / SHA512 |

### ⏱️ 时间（1）
| 工具 | 说明 |
|---|---|
| 时间戳转换 | 时间戳 ↔ 日期互转 |

### 🧬 开发（5）
| 工具 | 说明 |
|---|---|
| JSON 美化 | 格式化校验与压缩 |
| JSON ↔ YAML | 双向格式互转 |
| 正则测试 | 实时匹配高亮 |
| 正则提取 | 批量提取匹配内容 |
| UUID 生成 | 批量生成 UUID v4 |

### 🎨 设计（2）
| 工具 | 说明 |
|---|---|
| 颜色工具 | HEX / RGB / HSL 互转 |
| 对比度检查 | WCAG AA / AAA 评级 |

### 🌍 网络（4）
| 工具 | 说明 |
|---|---|
| IP 地址解析 | IPv4 分类与合法性校验 |
| 子网计算器 | 网络地址/掩码/主机数 |
| MAC 生成器 | 随机 MAC 地址 |
| 端口查询 | 56 个常用端口速查 |

### 🎲 趣味（1）
| 工具 | 说明 |
|---|---|
| 随机生成器 | 整数/抽签/强密码 |

### 🗒️ 生活（1）
| 工具 | 说明 |
|---|---|
| 本地便签 | 本地存储不丢笔记 |

### 🐉 游龙核心（3）
| 工具 | 说明 |
|---|---|
| 广告规则查询 | 游龙广告拦截引擎，真实 21 万+ 规则 |
| 安全体检 | 12 项权限检测与风险扫描 |
| 容器终端 | 游龙容器沙箱模拟终端 |

## 🌐 部署上线

### 方式一：GitHub Pages（推荐，免费）

1. Fork 本仓库 或 新建仓库上传代码
2. 仓库 → **Settings** → **Pages** → Source 选 `main` / 根目录 → Save
3. 等待 1 分钟，访问 `https://你的用户名.github.io/仓库名/`

> 本项目已内置 `.github/workflows/deploy.yml`，推送后自动部署，无需手动配置。

### 方式二：Vercel（免费）

1. 注册 [vercel.com](https://vercel.com)
2. Import Git Repository → 选择本仓库
3. Framework Preset 选 **Other** → Deploy
4. 自动生成域名，每次推送自动更新

### 方式三：Netlify（免费）

访问 [app.netlify.com](https://app.netlify.com) → Add new site → Deploy manually → 把本文件夹拖进去。

### 方式四：腾讯云 EdgeOne Pages（国内推荐）

1. 登录腾讯云 → 搜索 EdgeOne
2. 边缘 Pages → 创建项目 → 导入 Git 仓库或上传文件夹
3. 构建命令留空，输出目录填 `/`
4. 获得 `*.edgeonedy1.com` 域名

### 方式五：自有服务器（Nginx）

```bash
cp index.html style.css engine.js rules.js /var/www/yl-tools/

# 参考 deploy.conf 配置 Nginx
# 开启 gzip 后 rules.js 从 4.7MB 压缩到约 1.3MB
sudo nginx -t && sudo systemctl reload nginx
```

## 🛠️ 技术说明

- **零框架**：纯原生 JavaScript，无 React / Vue / jQuery
- **拦截引擎**：自研 Trie + 通配符匹配逻辑，与原版游龙广告拦截引擎行为一致
- **容器终端**：模拟环境，非真实 Linux 内核，仅用于演示容器命令交互
- **规则格式**：每条规则含 `domain` + `action`（0=拦截 / 1=放行）+ `source`（来源标识）

## 📄 License

[MIT License](./LICENSE) © 2026 游龙工具集

广告拦截规则遵循各上游规则的原始许可证。
