# 🧾 Resume Generator | Markdown 简历生成器

一款基于 Markdown 的 **在线简历生成工具**，内置多套精美模板，支持实时预览、PDF 导出和深度自定义。

🚀 **无需前端知识**，用 Markdown 轻松打造专业简历！

---

## ✨ 核心功能

- **📝 Markdown 驱动** - 用熟悉的语法编写内容，实时渲染简历
- **🪄 图标支持** - 通过自定义语法插入 Iconify 图标，让简历更直观
- **🎨 多模板切换** - 内置现代、简约、学术等多种风格模板
- **🌈 主题定制** - 自定义颜色、字体、间距等视觉元素
- **📤 一键导出** - 支持 PDF/PNG 高清导出（前端+服务端双模式）

---

## 🚀 快速开始

### 在线使用

1. 访问 [https://resume-doyuli.vercel.app](https://resume-doyuli.vercel.app/)
2. 在左侧编辑 Markdown，右侧实时预览
3. 点击「导出 PDF」生成简历

### 本地开发

```bash
# 安装依赖
pnpm install

# 启动前端开发服务器
pnpm dev

# （可选）如需服务端 PDF 渲染（Puppeteer）
pnpm dev:node
```

### 在简历中使用图标 🪄

为了让简历更直观，本项目支持通过自定义语法插入 Iconify 图标。
只需要在 Markdown 中写：

```md
联系我 :icon-mdi:github
邮箱 :icon-mdi:email
电话 :icon-mdi:phone
```

图标语法说明 `:icon-集合名:图标名`

> 所有可用的图标集合和名称都可以在 [iconify 图标库](https://icon-sets.iconify.design/) 中搜索

## 🎨 定制主题指南

简历的样式完全可定制，支持 Sass + CSS 变量

以下是开发新主题的流程 👇

1. 启动主题编译服务

```bash
pnpm compile:theme
```

2. 创建新主题文件

进入 `themes/` 目录，新建一个 `.scss` 文件（例如 my-theme.scss），并在文件顶部引入全局基础样式：

```scss
@import './global.scss';
```

3. 使用内置 CSS 变量

主题开发推荐基于以下 CSS 变量进行覆盖：

```css
--u-theme: #a8b1ff; /* 主题主色 */
--u-line-height: 1.9; /* 全局行高 */
--u-font-family: 'Noto Sans SC'; /* 全局字体 */
--text-color: #747474; /* 默认文字颜色 */
```

你可以在 SCSS 文件里自由拓展，也可以用 `:root` 或 `.u-view` 作用域来覆盖。

4. 注册主题

在 `src/themes/index.ts` 中添加新主题配置：

```ts
import type { ResumeStore } from '@/stores'
import blueThemeCss from './blue.css?raw'
import defaultThemeCss from './default.css?raw'
// my-theme
import myThemeCss from './my-theme.css?raw'

export interface ThemeOptions {
  label: string
  value: string
  css: string
  themeColor?: string
  custom?: (context: ResumeStore) => void
}

export const defaultTheme = {
  label: '极简主义',
  value: 'default',
  css: defaultThemeCss,
}

export const themes: ThemeOptions[] = [
  defaultTheme,
  {
    label: '深蓝星空',
    value: 'blue',
    css: blueThemeCss,
    themeColor: 'blue',
  },
  // my-theme
  {
    label: '我的主题',
    value: 'my-theme',
    css: myThemeCss,
    themeColor: '#1890ff',
    custom: (store) => {
      // 可选：对数据进行特殊处理
    },
  },
]
```

完成后，就可以在页面中切换到新主题啦 ✨

## ✨ Contributing

欢迎提交 PR 或 issue 来改进项目！

## ✨ Recommendation

- [mujicv](https://www.mujicv.com/)
- [codemirror](https://codemirror.net/)
- [iconify](https://iconify.design/)
