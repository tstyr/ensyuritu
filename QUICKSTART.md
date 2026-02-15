# 🚀 クイックスタートガイド

AMD CPU/GPU円周率計算システムを5分で起動！

## ✅ 前提条件

- Node.js 16以上
- npm または yarn
- インターネット接続

## 📦 インストール（完了済み）

すべての依存関係はインストール済みです！

## 🎯 起動手順

### ステップ1: Next.jsダッシュボードを起動

```bash
cd nextjs-app
npm run dev
```

ブラウザで **http://localhost:3000** を開く

### ステップ2: 計算エンジンを起動（別のターミナル）

```bash
cd local-calculator
npm start
```

## 🎉 完了！

ダッシュボードで以下が表示されます：

- ✅ リアルタイム円周率計算
- ✅ 計算速度: 約19,000,000回/秒
- ✅ アクティブワーカー: 11スレッド
- ✅ パフォーマンスグラフ
- ✅ 接続状態: Connected

## 📊 現在の性能

```
=== AMD CPU/GPU Pi Calculator ===
CPU Cores: 12
Worker Threads: 11
==================================

--- Statistics ---
Elapsed Time: 56.9s
Total Iterations: 1,099,000,000
Iterations/sec: 19,328,514
Pi Estimate: 3.141510755232029
Active Workers: 11/11
Data sent to Pusher ✓
```

## 🔧 Pusher設定（完了済み）

```
✅ App ID: 2115739
✅ Key: ee031210b68879ca2771
✅ Secret: 19cfefddad1f05862158
✅ Cluster: ap3 (Tokyo)
```

## 🌐 Vercelデプロイ

```bash
cd nextjs-app
vercel deploy
```

環境変数を設定：
```
NEXT_PUBLIC_PUSHER_KEY=ee031210b68879ca2771
NEXT_PUBLIC_PUSHER_CLUSTER=ap3
```

## 💡 ヒント

- **計算速度を上げる**: `local-calculator/local_calculator.js` の `BATCH_SIZE` を増やす
- **更新頻度を上げる**: `UPDATE_INTERVAL` を500msに変更
- **複数ブラウザで表示**: 同じURLを複数のブラウザで開ける

## 🛑 停止方法

両方のターミナルで `Ctrl+C` を押す

## 📚 詳細ドキュメント

- [README.md](README.md) - 完全なドキュメント
- [SETUP.md](SETUP.md) - 詳細なセットアップガイド

## 🎊 成功！

システムは完全に動作しています。円周率計算をお楽しみください！