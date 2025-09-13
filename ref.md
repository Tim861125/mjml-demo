# MJML App

## 專案概述

MJML App 是一個基於 Bun 和 TypeScript 的命令列工具，專門用於處理 MJML（Mailjet Markup Language）電子郵件模板。該專案提供 MJML 模板轉換、預覽和發送功能，主要針對專利相關的通知郵件系統設計。

## 技術架構

### 運行環境

- **Runtime**: Bun v1.2.17+
- **語言**: TypeScript 5.x
- **模組系統**: ESNext with Preserve module mode

### 核心依賴

- **MJML**: `^4.15.3` - 電子郵件模板引擎
- **Nodemailer**: `^7.0.4` - 郵件發送服務
- **Commander.js**: `^14.0.0` - 命令列介面框架
- **Open**: `^10.1.2` - 瀏覽器預覽工具

### 開發工具

- **Biome**: `2.0.6` - 程式碼格式化和 Linting
- **TypeScript**: 嚴格模式配置，現代化編譯選項

## 專案結構

```
gemini-mjml-app/
├── src/
│   ├── index.ts          # 主要命令列邏輯
│   ├── utils/
│   │   ├── mjml.ts       # MJML 轉換工具
│   │   └── email.ts      # 電子郵件發送工具
│   └── temp.html         # 臨時預覽檔案
├── example/              # MJML 範例模板
│   ├── welcome.mjml
│   ├── notification.mjml
│   ├── promotion.mjml
│   ├── patent-*.mjml     # 專利相關模板
│   └── *.prd.md          # 產品需求文件
├── images/               # 靜態資源
├── index.ts              # 入口點
├── package.json
├── tsconfig.json
└── mise.toml
```

## 功能規格

### 1. MJML 轉換功能

**位置**: `src/utils/mjml.ts:3`

```typescript
convertMjmlToHtml(mjmlContent: string)
```

- 將 MJML 標記語言轉換為響應式 HTML
- 使用 mjml2html 函式庫
- 返回包含 HTML 和錯誤資訊的物件

### 2. 電子郵件發送功能

**位置**: `src/utils/email.ts:3`

```typescript
sendEmail(to: string, subject: string, html: string)
```

**SMTP 配置**:

- Host: `process.env.SMTP_HOST` (預設: "mail.ltc")
- Port: `process.env.SMTP_PORT` (預設: 587)
- 安全性: TLS/SSL 支援，證書驗證關閉
- 發送者: `process.env.EMAIL_FROM`

### 3. 命令列介面

#### 發送命令

```bash
bun run index.ts send <mjmlPath> <recipient>
```

- 轉換 MJML 檔案為 HTML
- 發送電子郵件給指定收件人
- 郵件主旨固定為 "Your MJML Email"

#### 預覽命令

```bash
bun run index.ts preview <mjmlPath> [jsonPath]
```

- 轉換 MJML 檔案為 HTML
- 生成臨時 HTML 檔案 (`src/temp.html`)
- 在預設瀏覽器中開啟預覽
- 可選擇性地使用 JSON 檔案提供模板變數

#### 轉換命令

```bash
bun run index.ts convert <mjmlPath> <outputPath> [jsonPath]
```

- 轉換 MJML 檔案為 HTML
- 將結果儲存到指定的輸出檔案
- 可選擇性地使用 JSON 檔案提供模板變數
- 顯示 MJML 轉換警告（如有）

## 模板系統

### 專利通知模板設計規範

#### 產品色系如下

- IPTECH

- WEBPAT

- MTRENDS

## 環境變數配置

```bash
# SMTP 郵件伺服器設定
SMTP_HOST=mail.ltc
SMTP_PORT=587
SMTP_SECURE=false
EMAIL_FROM=your-sender@domain.com
```

## 使用說明

### 安裝依賴

```bash
bun install
```

### 發送郵件範例

```bash
bun run index.ts send templates/webpat-download-notification.mjml user@example.com
bun run index.ts send templates/webpat-download-notification.mjml user@example.com theme-data/sample-data-webpat.json --lang zh-TW
```

### 預覽模板範例

```bash
bun run index.ts preview templates/webpat-download-notification.mjml
bun run index.ts preview templates/webpat-download-notification.mjml theme-data/sample-data-webpat.json
```

### 語系模板
```bash
bun run index.ts preview templates/webpat-download-notification.mjml ./theme-data/sample-data-webpat.json --lang zh-TW
```

### 轉換 MJML 為 HTML 檔案

```bash
bun run index.ts convert templates/webpat-download-notification.mjml output.html
bun run index.ts convert templates/webpat-download-notification.mjml output.html theme-data/sample-data-webpat.json --lang zh-TW
```

## 安全性考量

- SMTP 連線採用 TLS 加密，但 `rejectUnauthorized: false` 設定需要評估安全風險
- 建議在生產環境中啟用適當的證書驗證
- 環境變數應妥善保護，避免敏感資訊洩露

## 擴展性

該專案架構支援：

- 新增更多 MJML 模板類型
- 擴充命令列功能
- 整合其他郵件服務提供商
- 加入模板變數替換功能
- 支援多語系電子郵件模板

## 開發注意事項

- 使用 Bun 作為 JavaScript 運行時，注意與 Node.js 的相容性差異
- TypeScript 配置採用嚴格模式，確保程式碼品質
- MJML 模板應遵循響應式設計原則，確保在各種裝置上的顯示效果

## 電子郵件測試與驗證

### 測試環境

#### 主要郵件客戶端測試
- **網頁版郵件服務**
  - Gmail (Chrome, Firefox, Safari)
  - Outlook Web App
  - Yahoo Mail
  - Apple iCloud Mail
- **桌面郵件客戶端**
  - Microsoft Outlook (Windows/Mac)
  - Apple Mail (macOS/iOS)
  - Mozilla Thunderbird
- **行動裝置郵件 App**
  - iOS 原生郵件 App
  - Android Gmail App
  - Outlook Mobile App

#### 裝置與螢幕尺寸測試
- **桌面裝置**: 1920x1080, 1366x768, 1440x900
- **平板裝置**: iPad (768x1024), Android 平板 (800x1280)
- **手機裝置**: iPhone (375x667, 414x736), Android (360x640, 412x732)

### 視覺檢測項目

#### 版面配置檢查
- **響應式設計 (RWD)**
  - 內容在不同螢幕尺寸下正確縮放
  - 文字可讀性不受影響
  - 按鈕和連結可正常點擊
  - 表格在小螢幕上適當調整
- **版面穩定性**
  - 無元素重疊或錯位
  - 間距和對齊保持一致
  - 區塊邊界清晰

#### 字型與文字檢測
- **字型顯示**
  - 字型家族回退機制正常運作
  - 中文字型 (Microsoft JhengHei) 正確顯示
  - 特殊字元和符號不出現亂碼
- **文字規格**
  - 標題、內文字級大小符合設計規範
  - 行高 (line-height) 適當，文字易讀
  - 文字顏色對比度符合無障礙標準 (WCAG AA)

#### 圖片與媒體檢測
- **圖片顯示**
  - 所有圖片正常載入，無破圖現象
  - 圖片尺寸在不同裝置上適當縮放
  - Alt 文字正確設定，支援輔助技術
  - 高解析度顯示器 (Retina) 圖片清晰
- **Logo 與品牌元素**
  - 公司 Logo 清晰度和定位正確
  - 品牌色彩一致性維持

#### 色彩主題支援
- **Light Mode (預設)**
  - 背景色 #f0f4f8, 內容區塊 #ffffff
  - 文字色彩對比度充足
  - 連結和按鈕顏色醒目
- **Dark Mode 相容性**
  - 深色背景下文字仍清晰可讀
  - 圖片和 Logo 在深色模式下適當顯示
  - 色彩反轉不影響品牌識別

### 功能性測試

#### 互動元素檢測
- **連結功能**
  - 所有 CTA 按鈕可正常點擊
  - 連結 URL 正確指向目標頁面
  - 外部連結在新視窗開啟
- **表單元素** (如有)
  - 輸入欄位在各客戶端正常運作
  - 提交按鈕功能正常

#### 無障礙檢測
- **鍵盤導航**
  - Tab 鍵可正確切換焦點
  - 按鈕和連結支援 Enter 鍵操作
- **螢幕閱讀器相容**
  - 語意化 HTML 結構正確
  - ARIA 標籤適當設置
  - 圖片 Alt 文字描述完整

### 技術檢測

#### 程式碼品質檢查
- **HTML 有效性**
  - 使用 W3C HTML Validator 檢查
  - 語意化標籤使用正確
- **CSS 相容性**
  - 避免使用不支援的 CSS 屬性
  - 漸進式增強設計原則
- **圖片最佳化**
  - 檔案大小適中 (建議 < 100KB)
  - 格式選擇 (JPEG/PNG/WebP)

### 垃圾郵件檢測
- **內容檢查**
  - 避免垃圾郵件關鍵字
  - 文字與圖片比例適當
  - 連結數量合理
- **技術指標**
  - SPF、DKIM、DMARC 設定正確
  - 發送者信譽度良好
  - 退信率監控

### 測試工具建議
- **Litmus**: 跨平台郵件測試服務
- **Email on Acid**: 全面的郵件測試平台
- **Mailtrap**: 開發環境郵件測試
- **Can I Email**: CSS 支援度查詢
- **WAVE**: 網頁無障礙檢測工具


## Note
### 2025-08-29
- **Fix**: Outlook 無法顯示漸層效果, 暫設為無漸層

### 2025-09-01
- **專案流程**
  - 開發 preview 信件
    ```bash
    bun run index.ts preview templates/webpat-download-notification.mjml ./theme-data/sample-data-webpat.json --lang zh-TW
    ```
  - 確認沒問題 > 送出信件在 Outlook, gmail 測試
    ```bash
    bun run index.ts send templates/webpat-download-notification.mjml user@example.com theme-data/sample-data-webpat.json --lang zh-TW
    ```
  - mail 測試沒問題, 轉成 html 給第三方消費者使用
    ```bash
    bun run index.ts convert templates/webpat-download-notification.mjml output.html theme-data/sample-data-webpat.json --lang zh-TW
    ```
