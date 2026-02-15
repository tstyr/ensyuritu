# AMD CPU/GPU Pi Calculation System

AMD Ryzen CPUとRadeon GPUをフル活用した円周率計算システム。リアルタイムで計算結果をNext.jsダッシュボードに表示します。

## システム構成

### 1. 計算エンジン (Local Node.js)
- **AMD CPU全コア活用**: `worker_threads`による並列計算
- **GPUアクセラレーション**: `gpu.js`によるAMD Radeon GPU計算
- **リアルタイム通信**: Pusher経由でWebSocket通信

### 2. フロントエンド (Next.js / Vercel)
- **リアルタイム表示**: WebSocketで計算結果を受信
- **ダッシュボード**: 計算状況、パフォーマンス、統計を表示
- **ダークモード**: Tailwind CSSによるモダンなUI

## セットアップ

### 1. 計算エンジンのセットアップ
```bash
cd local-calculator
npm install
```

### 2. Next.jsアプリのセットアップ
```bash
cd nextjs-app
npm install
```

### 3. Pusher設定 ✅ 完了
Pusher設定は完了しています！

**設定済み情報**:
- `app_id`: 2115739
- `key`: ee031210b68879ca2771
- `secret`: 19cfefddad1f05862158
- `cluster`: ap3

すぐに使用できます！

## 使用方法

### 計算エンジンの起動
```bash
cd local-calculator
npm start  # CPUモード
npm run start:gpu  # GPUモード
```

### Next.jsアプリの起動
```bash
cd nextjs-app
npm run dev
```

## 機能

### 計算エンジン
- AMD CPUの全スレッドを使用した並列計算
- GPU.jsによるGPUアクセラレーション（オプション）
- モンテカルロ法による円周率計算
- リアルタイム統計出力
- Pusher経由でのデータ送信

### ダッシュボード
- リアルタイム円周率表示（桁ごとのアニメーション）
- 計算速度、試行回数、アクティブワーカーの表示
- パフォーマンスグラフ（Recharts）
- 接続状態監視
- ハードウェア使用率表示
- ダークモードUI

## 技術スタック

### バックエンド
- Node.js 16+
- Worker Threads
- GPU.js
- Pusher (WebSocket)

### フロントエンド
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Recharts
- Lucide React Icons

## デプロイ

### Vercelへのデプロイ
```bash
cd nextjs-app
vercel deploy
```

### 環境変数
Vercelで以下の環境変数を設定：
```
NEXT_PUBLIC_PUSHER_KEY=your_pusher_key
NEXT_PUBLIC_PUSHER_CLUSTER=ap3
```

## パフォーマンス最適化

### AMD CPU最適化
- 物理コア数に基づいたワーカー数自動設定
- メモリ効率を考慮したバッチサイズ
- 負荷分散アルゴリズム

### GPU最適化
- GPU.jsによる並列計算
- メモリ転送の最小化
- フォールバック機構（GPU未検出時はCPU使用）

### 通信最適化
- WebSocketによる低遅延通信
- データ圧縮
- 再接続処理

## ライセンス

MIT License