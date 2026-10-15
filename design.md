# 设计规范 · design.md

> **这份文档是本项目所有页面的唯一风格依据。**
> 每做一个新页面（无论放在哪个 week 目录），都要先读这份文档，严格按里面的 token 和组件规则实现，
> 不要临时自创颜色、字号或圆角。如果确实需要新增 token，先改这份文档，再改页面。

- **风格来源**：https://www.grilledpixels.com/ecommerce/ （深色编辑风）
- **落地参考实现**：[week3/style.css](week3/style.css)、[week3/index.html](week3/index.html)
- **技术前提**：纯 HTML + CSS + 原生 JS，不引入框架和 UI 库

---

## 0. 设计原则

1. **深色底 + 大字排版**：页面底色纯黑，标题极大，靠字号落差而不是加粗来建立层级。
2. **零圆角、零阴影**：全站 `border-radius: 0`、`box-shadow: none`。层次靠明度差（`#000` / `#121212`）和 1px 边线。
3. **标题一律 400 字重**：页面里只有按钮和标签用 500。没有 600/700 的标题。
4. **一处强调色**：整站只有一种彩色（红 `#EE344A`），只用于 hover 底色、hover 文字、当前状态标记。
5. **等宽体做点缀**：小标签、编号、导航、按钮用等宽字体 + 全大写 + 宽字距；大标题里的关键词切成等宽体做强调。
6. **大留白**：分区上下 84px，模块之间 64–96px，宁可空也不要挤。

---

## 1. 配色

### 1.1 色值表

| 角色 | 变量 | 色值 | 用途 |
| --- | --- | --- | --- |
| 主色（强调色） | `--red` | `#EE344A` | 按钮 hover 底色、链接 hover、导航下划线、当前状态标记、脚注重点 |
| 辅助色（毛玻璃） | `--glass` | `rgba(255,255,255,.06)` | 按钮、标签、输入框的底色 |
| 页面背景 | `--black` | `#000000` | 全站页面底色 |
| 卡片 / 媒体背景 | `--card` | `#121212` | 卡片、图片容器底色（比页面亮一档） |
| 主要文字 | `--text` | `#FFFFFF` | 标题、正文主体 |
| 次要文字 | `--text-2` | `rgba(255,255,255,.7)` | 段落、描述、标签文字 |
| 弱化文字 | `--text-3` | `rgba(255,255,255,.4)` | 编号、未选中的导航、placeholder |
| 标准边线 | `--line` | `#FFFFFF24` | 按钮、标签、卡片的 1px 边框 |
| 细分隔线 | `--line-soft` | `rgba(255,255,255,.12)` | 分区之间的分隔线、输入框 focus 边线 |
| 图片遮罩 | — | `rgba(0,0,0,.32)` | 浅色截图在黑底上的压暗层，hover 降到 `.05` |

### 1.2 用法规则

- **红色只做点缀，不做大面积填充**。允许出现的位置：按钮 hover 背景、链接 hover 文字与下划线、当前分区标记、脚注文字。
- **正文不使用纯白**，统一用 `--text-2`；只有标题和需要强调的内容用 `--text`。
- **浅色截图必须压暗**：素材如果是浅底页面截图，容器上加 `rgba(0,0,0,.32)` 遮罩，hover 时揭到 `rgba(0,0,0,.05)`，否则在黑底上会刺眼。
- 禁止使用：渐变、彩色阴影、第二种强调色、纯黑文字。

### 1.3 CSS 变量（直接复制）

```css
:root {
  /* 配色 */
  --black: #000000;
  --white: #ffffff;
  --red: #ee344a;
  --card: #121212;
  --glass: rgba(255, 255, 255, 0.06);
  --line: #ffffff24;
  --line-soft: rgba(255, 255, 255, 0.12);
  --text: #ffffff;
  --text-2: rgba(255, 255, 255, 0.7);
  --text-3: rgba(255, 255, 255, 0.4);
}
```

---

## 2. 字体

### 2.1 字体族

参考站用商用字体 Untitled Sans / Tronica Mono / AtHauss Mono，本项目用开源近似替代：

| 变量 | 字体栈 | 用途 |
| --- | --- | --- |
| `--font-sans` | `"Inter", "Helvetica Neue", Helvetica, Arial, sans-serif` | 标题、正文、段落 |
| `--font-mono` | `"Space Mono", ui-monospace, Menlo, Consolas, monospace` | 标签、编号、导航、按钮、标题里的关键词 |

引入方式（放在每个页面的 `<head>`）：

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
```

### 2.2 字号层级表

| 层级 | 字号 | 字重 | 行高 | 字距 | 字体 | 大小写 |
| --- | --- | --- | --- | --- | --- | --- |
| 首屏主标题 | 42 → 80 → 120 → **140px** | **400** | 0.88 | **-0.04em** | Inter | 大写 |
| 收尾区大标题 | `clamp(32px, 5.2vw, 64px)` | 400 | 0.9 | -0.03em | Inter | 大写 |
| 分区陈述句 | `clamp(28px, 4.4vw, 56px)` | 400 | 0.92 | -0.03em | Inter | 大写 |
| 卡片 / 作品标题 | `clamp(26px, 3.2vw, 44px)` | 400 | 0.95 | -0.03em | Inter | 大写 |
| 正文 / 描述 | 17px | 400 | 1.5 | 0 | Inter | 正常 |
| 副标题 | 13px（≥1024px 用 16px） | **500** | 1.45 | 0.04em | Space Mono | 大写 |
| 按钮 | 13px | **500** | 1.2 | 0.08em | Space Mono | 大写 |
| 编号 / 标签 | 12px | **500** | 1.2 | 0.08em | Space Mono | 大写 |
| 导航项 | 11px | **500** | 1.2 | 0.12em | Space Mono | 大写 |

**首屏主标题断点**：`≥700px` → 80px，`≥1024px` → 120px，`≥1200px` → 140px。
（对应参考站的 `8rem` / `12rem` / `14rem`）

### 2.3 排版规则

- **大标题负字距收紧**（-0.03 ~ -0.04em），**小标签宽字距放开**（0.08 ~ 0.12em），这是这套风格的识别点，不能省。
- **标题里的关键词切成等宽体**做强调：
  ```html
  <h1><span>Front<em>end</em></span><span>Portfolio</span></h1>
  <h3 class="work-title">Register<br><em>注册表单</em></h3>
  ```
  ```css
  h1 em { font-family: var(--font-mono); font-style: normal; letter-spacing: 0; }
  ```
- 等宽体渲染中文会显得空，中日韩文字部分建议放在 Inter 里（如上面的「注册表单」用 mono 是刻意的对比，长段落不要用 mono）。
- 所有小标签必须 `text-transform: uppercase`，中文不受影响。

---

## 3. 间距

### 3.1 基础数值

| 变量 / 用途 | 取值 |
| --- | --- |
| `--grid-margin`（页面左右边距） | **24px** |
| `--grid-gutter`（网格列间距） | **36px** |
| 分区内边距 | **`84px 24px 48px`** |
| 首屏底部内边距 | `84px 24px 48px` |
| 收尾区底部内边距 | `84px 24px 160px` |

### 3.2 常用的内边距

| 组件 | 内边距 |
| --- | --- |
| 按钮（大屏 ≥1024px） | `16px 36px` |
| 按钮（小屏） | `16px 24px` 或 `12px 16px` |
| 标签 / Tag | `8px 12px` |
| 导航项 | `2px 0 2px 17px`（左侧 17px 给状态方块留位） |
| 卡片内文字区 | `24px` |

### 3.3 模块间距

| 位置 | 取值 |
| --- | --- |
| 分区之间 | 由分区的 `84px` 上下边距形成 |
| 列表项之间（如作品行） | **96px**（窄屏 64px） |
| 分区标题 → 内容 | **72px** |
| 标题 → 正文 | 20px |
| 正文 → 标签组 | 24px |
| 标签组 → 链接 | 28px |
| 卡片之间 | 24px |
| 首屏元素之间 | 24px（≥1024px 用 36px） |
| 网格列间距 | `--grid-gutter` = 36px |

### 3.4 布局网格

- **12 栏网格**，`column-gap: 36px`，左右 `padding: 24px`（≥1024px）。
- 常用切分：**图占 1–6 栏，文占 8–12 栏**（两栏内容行）。
- 内容最大宽度 1120px；首屏内容最大 1100px；正文段落最大 44rem（≈440px，保证行长 60–75 字符）。
- 宽屏（≥1024px）时左侧要给固定导航留出 **150px** 通道，避免重叠。

---

## 4. 组件样式

### 4.0 全局规则

```css
* { margin: 0; padding: 0; box-sizing: border-box; }

/* 全站零圆角、零阴影 */
border-radius: 0;
box-shadow: none;
```

**任何组件都不要加圆角或阴影** —— 这是这套风格最重要的特征。

### 4.1 按钮

三种按钮，统一特征：**直角 + 1px 边线 `#FFFFFF24` + 毛玻璃底 `rgba(255,255,255,.06)` + `backdrop-filter: blur(8px)` + hover 变红**。

| 变体 | 类名 | 说明 |
| --- | --- | --- |
| 主按钮 / 顶栏按钮 | `.btn` / `.header-cta` | 等宽 13px/500/0.08em 大写；小屏 `12px 16px` + 11px，大屏 `16px 36px`；可带 16px 图标 |
| 文字链接按钮 | `.work-link` | 等宽 13px/500/0.1em；无边框无底色，用 `border-bottom: 1px solid var(--line)` 代替；hover 文字和下划线一起变红 |
| 大标题下的大按钮 | `.btn` | 同主按钮，`16px 36px` |

```css
.btn {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
  border: 1px solid var(--line);          /* #ffffff24 */
  background: var(--glass);               /* rgba(255,255,255,.06) */
  backdrop-filter: blur(8px);
  border-radius: 0;
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--white);
  cursor: pointer;
  transition: background-color 0.4s cubic-bezier(0.8, 0, 0, 1);
}
.btn:hover { background-color: var(--red); }   /* hover 是变红，不是黑白反转 */
```

### 4.2 卡片

| 属性 | 规则 |
| --- | --- |
| 圆角 | `0` |
| 阴影 | `none` |
| 边框 | `1px solid rgba(255,255,255,.06)` |
| 底色 | `var(--card)` = `#121212` |
| 内边距 | 文字区 `24px`；图片贴边不加内边距 |
| 图片 | `aspect-ratio: 4/3`，`object-fit: cover`，`object-position: top center` |
| 图片遮罩 | 默认 `rgba(0,0,0,.32)`，hover 揭到 `rgba(0,0,0,.05)` |
| hover 动效 | 图片 `scale(1.03)`，遮罩变淡，0.6–0.8s |

```css
.card {
  position: relative;
  overflow: hidden;
  background: var(--card);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 0;
  box-shadow: none;
}
.card::after {           /* 浅色素材的压暗层 */
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.32);
  pointer-events: none;
  transition: background-color 0.6s cubic-bezier(0.8, 0, 0, 1);
}
.card:hover::after { background: rgba(0, 0, 0, 0.05); }
.card img { display: block; width: 100%; height: auto; object-fit: cover; transition: transform 0.8s cubic-bezier(0.8, 0, 0, 1); }
.card:hover img { transform: scale(1.03); }
```

**卡片列表的首选布局**：不用三列小卡片，改用**全宽两栏行**（图 1–6 栏 + 文 8–12 栏），
行与行之间 `96px`，每行顶部一条 `1px solid var(--line-soft)` 分隔线，更接近参考站的编辑感。

### 4.3 导航

**顶栏**（固定）

| 属性 | 规则 |
| --- | --- |
| 定位 | `position: fixed; top: 24px; left: 0; right: 0;` |
| 内边距 | `0 24px`，左右两端对齐（logo ↔ 操作按钮） |
| 圆角 / 阴影 | `0` / `none` |
| 背景 | 透明；按钮自身带毛玻璃 |

**左侧分区导航**（固定）

| 属性 | 规则 |
| --- | --- |
| 定位 | `fixed; top: 50%; left: 24px; transform: translateY(-50%)` |
| 排列 | `flex-direction: column; gap: 12px` |
| 字号 | 等宽 11px / 500 / `letter-spacing .12em` / 大写 |
| 未选中 | 颜色 `rgba(255,255,255,.4)` |
| 当前项 | 颜色 `#fff`，左侧出现 7×7px 白色方块 |
| hover | 颜色变白 + 1px 红色下划线从左展开（`width: 0 → 100%`） |
| 显示断点 | `≥1024px` 才显示，小屏隐藏 |
| 通道 | 宽屏下内容区左侧留 150px，避免重叠 |

```css
.side-nav a { position: relative; padding: 2px 0 2px 17px; font-family: var(--font-mono);
  font-size: 11px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase;
  color: rgba(255,255,255,.4); transition: color .4s cubic-bezier(0.8,0,0,1); }
.side-nav a::before {            /* 当前状态方块 */
  content: ""; position: absolute; left: 0; width: 7px; height: 7px;
  background: #fff; transform: scale(0); transition: transform 1s cubic-bezier(0.8,0,0,1); }
.side-nav a::after {             /* hover 下划线 */
  content: ""; position: absolute; left: 17px; bottom: 0; width: 0; height: 1px;
  background: var(--red); transition: width .6s cubic-bezier(0.8,0,0,1); }
.side-nav a:hover { color: #fff; }
.side-nav a:hover::after { width: calc(100% - 17px); }
.side-nav a.is-active { color: #fff; }
.side-nav a.is-active::before { transform: scale(1); }
```

### 4.4 其他组件

| 组件 | 规则 |
| --- | --- |
| 标签 / Tag | 等宽 12px/500/0.08em 大写；`1px solid #ffffff24`；`background: #ffffff06` + `blur(2px)`；`padding: 8px 12px`；圆角 0 |
| 输入框 | `background: rgba(255,255,255,.06)`；`1px solid rgba(255,255,255,.06)`；`blur(2px)`；高 60px；`padding: 24px`；16px 文字；placeholder `rgba(255,255,255,.4)`；focus 边线 `rgba(255,255,255,.12)`；圆角 0 |
| 表单 label | 等宽 14px 大写，白底黑字，压在输入框上边框上（`transform: translateY(-50%)`） |
| 分隔线 | `1px solid rgba(255,255,255,.12)` |
| 编号（001 / Project 01） | 等宽 12px/500/0.08em 大写，颜色 `--text-3` |

---

## 5. 动效规范

| 场景 | 参数 |
| --- | --- |
| **元素入场** | `opacity 0→1` + `translateY(100px → 0)`，**1.2s**，`cubic-bezier(0.430, 0.195, 0.020, 1)` |
| 入场错峰 | 依次 `0.25s` / `0.4s` / `0.6s` |
| hover 通用缓动 | `cubic-bezier(0.8, 0, 0, 1)`，时长 0.4s（颜色）/ 0.6s（下划线、遮罩）/ 0.8s（缩放） |
| 状态标记（方块） | `transform: scale(0→1)`，1s |
| 无障碍 | 必须加 `@media (prefers-reduced-motion: reduce)` 关闭入场位移动画 |

缓动变量：

```css
--bezzy: cubic-bezier(0.8, 0, 0, 1);              /* hover 用 */
--bezzy2: cubic-bezier(0.43, 0.195, 0.02, 1);     /* 入场用 */
```

入场动画统一用 `.reveal` 类 + IntersectionObserver（阈值 0.15，`rootMargin: 0px 0px -60px 0px`）：

```css
.reveal { opacity: 0; transform: translateY(100px);
  transition: opacity 1.2s var(--bezzy2), transform 1.2s var(--bezzy2); }
.reveal.is-in { opacity: 1; transform: translateY(0); }
.delay-1 { transition-delay: .25s; }
.delay-2 { transition-delay: .4s; }
.delay-3 { transition-delay: .6s; }
```

---

## 6. 响应式断点

| 断点 | 变化 |
| --- | --- |
| `< 1024px` | 隐藏左侧导航；两栏内容行改为单列；列表间距 96 → 64px；按钮内边距缩小 |
| `≥ 700px` | 首屏标题 80px；副标题 20px |
| `≥ 1024px` | 启用 12 栏两栏行；显示左侧导航；内容左侧留 150px；首屏标题 120px；副标题 16px；列表行间距 96px |
| `≥ 1200px` | 首屏标题 140px |

**移动端也要保持**：零圆角、零阴影、黑色底、文字层级不变。

---

## 7. 新页面骨架

复制这份结构起步（替换内容即可，样式沿用上面的规范）：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>页面标题</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <!-- 顶栏：logo + 毛玻璃按钮 -->
  <header class="site-header">
    <a class="logo" href="#">LOGO</a>
    <a class="header-cta" href="#contact">联系我们</a>
  </header>

  <!-- 左侧分区导航（≥1024px 显示） -->
  <nav class="side-nav" aria-label="页面分区">
    <a href="#intro" data-nav="intro">Intro</a>
    <a href="#works" data-nav="works">Works</a>
    <a href="#contact" data-nav="contact">Contact</a>
  </nav>

  <!-- 首屏：满屏 + 超大标题 -->
  <section class="hero" id="intro">
    <div class="hero-inner">
      <h1 class="reveal delay-3"><span>页面<em>主标题</em></span><span>Second Line</span></h1>
      <p class="hero-sub reveal delay-3">一句话说明这个页面是做什么的</p>
    </div>
  </section>

  <!-- 内容区 -->
  <section class="section" id="works">
    <h2 class="statement reveal">大字陈述句，用来<span class="dim">引导视线</span><br><em>关键词</em></h2>
    <!-- 卡片 / 列表 -->
  </section>

  <!-- 收尾 -->
  <section class="contact" id="contact">
    <h2 class="reveal">一起<br><em>做点东西</em></h2>
    <a class="contact-mail reveal delay-1" href="#">联系方式</a>
    <p class="contact-note reveal delay-2">脚注</p>
  </section>

  <script src="script.js"></script>
</body>
</html>
```

---

## 8. 自查清单

新页面交付前逐条核对：

- [ ] 页面底色是 `#000000`，卡片是 `#121212`
- [ ] 全站 `border-radius: 0`、`box-shadow: none`（搜索一遍确认没有例外）
- [ ] 只有一种强调色 `#EE344A`，且只出现在 hover / 当前状态 / 脚注
- [ ] 所有标题 `font-weight: 400`，没有用过 600/700
- [ ] 大标题负字距（-0.03 ~ -0.04em），小标签宽字距（0.08 ~ 0.12em）+ 大写
- [ ] 小标签、编号、导航、按钮用等宽字体
- [ ] 分区内边距 `84px 24px 48px`，列表项间距 96px（窄屏 64px）
- [ ] 按钮是「直角 + `#ffffff24` 边线 + 毛玻璃 + hover 变红」
- [ ] 浅色图片素材加了 `rgba(0,0,0,.32)` 压暗层
- [ ] 有 `prefers-reduced-motion` 保护
- [ ] 1024px 以下隐藏左侧导航且内容不重叠
- [ ] 用无头浏览器渲染一遍确认（不靠肉眼猜）

---

## 9. 变更记录

| 日期 | 变更 |
| --- | --- |
| 2026-10-15 | 首版：从 grilledpixels ecommerce 页面提取 token 建立规范，落地于 `week3` |
| 2026-10-15 | 收敛标尺：按钮字体统一 13px、编号与标签统一 12px，消除同一类元素多个字号 |
