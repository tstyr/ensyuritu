# セットアップガイド

AMD CPU/GPU円周率計算システムのセットアップ手順です。

## ✅ Pusher設定完了

Pusher設定は完了しています！以下の認証情報が設定されています：

- **App ID**: 2115739
- **Key**: ee031210b68879ca2771
- **Secret**: 19cfefddad1f05862158
- **Cluster**: ap3 (Asia Pacific - Tokyo)

## 🚀 クイックスタート

### 1. 依存関係のインストール

#### ローカル計算エンジン
```bash
cd local-calculator
npm install
```

#### Next.jsダッシュボード
```bash
cd nextjs-app
npm install
```

### 2. システムの起動

#### ステップ1: Next.jsダッシュボードを起動
```bash
cd nextjs-app
npm run dev
```

ブラウザで http://localhost:3000 を開く

#### ステップ2: 計算エンジンを起動（別のターミナル）
```bash
cd local-calculator
npm start
```

または、GPUモードで起動：
```bash
npm run start:gpu
```

### 3. 動作確認

1. ブラウザでダッシュボードを開く
2. 計算エンジンを起動
3. リアルタイムで円周率の計算結果が表示される
4. パフォーマンスグラフが更新される
5. 接続状態が「Connected」になる

## 📊 期待される動作

### 計算エンジン（ターミナル）
```
=== AMD CPU/GPU Pi Calculator ===
CPU Cores: 16
Worker Threads: 15
GPU Mode: Disabled
==================================

CPU Info: AMD Ryzen 9 5900X
GPU Info: AMD Radeon RX 6800 XT

--- Statistics ---
Elapsed Time: 10.5s
Total Iterations: 150,000,000
Iterations/sec: 14,285,714
Pi Estimate: 3.141592653589793
Active Workers: 15/15
Data sent to Pusher
```

### ダッシュボード（ブラウザ）
- 円周率が桁ごとにアニメーション表示
- 試行回数がリアルタイムで増加
- 計算速度（iterations/sec）が表示
- アクティブワーカー数が表示
- パフォーマンスグラフが更新

## 🔧 トラブルシューティング

### 接続エラー
**症状**: ダッシュボードに「Disconnected」と表示される

**解決方法**:
1. Pusher設定を確認
2. インターネット接続を確認
3. ファイアウォール設定を確認
4. 計算エンジンが起動しているか確認

### 計算が開始されない
**症状**: 統計が更新されない

**解決方法**:
1. `local-calculator/local_calculator.js` のPusher設定を確認
2. Node.jsのバージョンを確認（16以上が必要）
3. 依存関係を再インストール: `npm install`

### GPUが検出されない
**症状**: GPU Modeで起動してもCPUで計算される

**解決方法**:
1. GPUドライバが最新か確認
2. `gpu.js`の互換性を確認
3. CPUモードで起動（`npm start`）

## 🌐 Vercelへのデプロイ

### 1. Vercel CLIのインストール
```bash
npm install -g vercel
```

### 2. Next.jsアプリをデプロイ
```bash
cd nextjs-app
vercel deploy
```

### 3. 環境変数の設定
Vercelダッシュボードで以下を設定：
```
NEXT_PUBLIC_PUSHER_KEY=ee031210b68879ca2771
NEXT_PUBLIC_PUSHER_CLUSTER=ap3
```

### 4. 本番デプロイ
```bash
vercel --prod
```

## 📝 設定のカスタマイズ

### 計算パラメータの調整
`local-calculator/local_calculator.js` で以下を変更：

```javascript
const CPU_WORKERS = Math.max(1, os.cpus().length - 1); // ワーカー数
const BATCH_SIZE = 1000000; // バッチサイズ
const UPDATE_INTERVAL = 1000; // 更新間隔（ms）
```

### パフォーマンス最適化
- **CPU使用率を上げる**: `BATCH_SIZE` を増やす
- **更新頻度を上げる**: `UPDATE_INTERVAL` を減らす（500ms推奨）
- **メモリ使用量を減らす**: `BATCH_SIZE` を減らす

## 🎯 次のステップ

1. ✅ Pusher設定完了
2. ✅ システム起動
3. ⬜ パフォーマンスチューニング
4. ⬜ Vercelデプロイ
5. ⬜ カスタマイズ

## 💡 ヒント

- AMD Ryzen CPUは全コアを使用すると非常に高速
- GPUモードは大規模計算で効果的
- ダッシュボードは複数のブラウザで同時に開ける
- 計算エンジンは複数起動可能（負荷分散）

## 📞 サポート

問題が発生した場合：
1. README.mdを確認
2. GitHubのIssuesを確認
3. Pusherのステータスページを確認: https://status.pusher.com/