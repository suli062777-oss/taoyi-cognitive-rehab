# 陶忆 · Taoyi

**面向老年人认知障碍康复训练的数字陶作交互原型。**

> 让时光，在指尖成形。

陶忆以制作一件陶器为活动载体，将观察、注意、记忆与手部操作融入连续制作流程。项目已实现可操作的 Web 原型；训练定位是设计目标，实际康复支持效果仍需专业评估与目标使用者研究。

![陶忆实际首页](docs/images/home.png)

## 体验流程

选择陶器 → 看目标步骤 → 手势制坯 → 装饰施釉 → 模拟烧制 → 成品回看。

- 支持陶碗、陶杯和小花瓶；同一件作品的实际轮廓、颜色与纹样贯穿全过程。
- 双掌塑形、单掌查看，支持粗调与精修；可切换按钮输入、撤销和回正视角。
- 分级帮助、暂停与续作，保留未完成作品；模拟烧制等待可以跳过。
- 成品命名、作品架、真实作品缩略图，以及 JSON 备份恢复和 CSV 过程导出。
- 陪伴入口可配置自由创作或简单目标；保留首次独立尝试与后续帮助记录。
- 毛玻璃界面、较大操作按钮、大字与清晰显示选项。

## 本地开发

开发时使用过的版本：Node.js 24.19.0、pnpm 11.25.0。依赖版本固定在 `pnpm-lock.yaml`。

在已有 Node 和 pnpm 的开发环境中，进入本仓库目录执行：

```sh
pnpm install --frozen-lockfile
pnpm dev
```

打开终端提示的 `http://127.0.0.1:4317`。相机仅在点击“开启相机”后请求权限；没有摄像头时可以使用按钮制坯。

```sh
pnpm build       # 类型检查、手势 Worker 与生产构建
pnpm preview     # 预览生产构建
pnpm test        # 单元测试
```

生产资源中的手势模型、WASM、字体和图片都保存在 `public/`。依赖安装需要网络；应用资源不依赖第三方 CDN。

### 运行入口与数据

此仓库提供源码，不包含机器相关的 `.runtime`、浏览器安装和 `node_modules`。

- `start.command` 与 `scripts/launch-studio.mjs` 是原本 macOS Apple Silicon 专用环境的入口，需要补齐项目内运行时和专用 Chromium；仅下载源码后不能直接双击这些旧入口。
- `packaging/windows/` 是 Windows x64 便携启动器源码；制作免安装包需要构建产物及对应的官方 Windows Node/Chromium 归档。已制作的 Windows ZIP 是独立交付物，不是此源码目录本身。
- 普通开发浏览器中的作品保存在该浏览器的 IndexedDB；专用分发启动器使用包内 profile，并将导出保存到 `exports`。不要将真实使用者数据提交到仓库。
- `pnpm test:e2e` 使用项目的浏览器回归配置；现有配置调用 `scripts/project.sh`，须先准备项目内 Node/pnpm 和 Playwright Chromium。这与直接运行 `pnpm dev/build/test` 的要求不同。

## 项目结构

| 目录 | 内容 |
| --- | --- |
| `src/` | 应用状态、作品模型、三维场景、相机输入、界面与本地保存 |
| `public/` | 陶器与界面素材、本地字体、手势模型和 WASM |
| `tests/` | 单元、浏览器流程与验收测试源码 |
| `vendor-snapshots/` | 冻结的手势核心来源快照与哈希台账 |
| `scripts/` | 本地专用启动、测量与便携包构建工具 |
| `packaging/windows/` | Windows 启动脚本、本机静态服务和打包检查 |
| `docs/` | 架构与实施资料、实际界面截图 |

技术构成：TypeScript、Vite、Three.js、MediaPipe Tasks Vision、IndexedDB、Vitest 与 Playwright。

## 隐私与验证边界

相机帧和手部关键点用于内存中的本地推断，不上传、不录像、不持久化轨迹。过程记录用于活动回顾，不产生认知诊断或疗效结论。

当前已有 Mac 上的软件流程检查和用户自报手势体验反馈。Windows 便携包完成构建、归档校验及 Mac 上的启动器逻辑验证，Windows 原生启动、显卡与真人相机仍需在目标设备确认。目标老年使用者的可用性和康复效果不能由软件测试代替。

## 来源与许可

手势制坯部分基于本项目冻结的长沙窑手势核心进行适配；运行与构建不需要原长沙窑目录。来源台账位于 `vendor-snapshots/kiln-r16-20261013/manifest.json`，上传副本中的个人计算机绝对路径已转换为来源占位符。

第三方许可见 `licenses/`、`public/mediapipe/LICENSE`、`public/assets/glass/fonts/notosanssc-OFL.txt` 与 `src/vendor/papercss/LICENSE.md`，npm 依赖遵循各自许可证。此仓库未额外授予项目整体开源许可证。
