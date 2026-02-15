# AMD CPU/GPU Pi Calculator

AMD Ryzen CPUの全スレッドとRadeon GPUを活用した円周率計算エンジン。

## 特徴

- **AMD CPU全コア活用**: `worker_threads`を使用して全CPUコアを並列計算
- **GPUサポート**: `gpu.js`によるGPUアクセラレーション（オプション）
- **リアルタイム通信**: Pusher経由でNext.jsアプリに計算結果を送信
- **高性能**: モンテカルロ法による高速な円周率計算

## セットアップ

```bash
cd local-calculator
npm install
```

## 使用方法

### CPUモード（デフォルト）
```bash
npm start
```

### GPUモード（GPU計算を有効化）
```bash
npm run start:gpu
```

### 開発モード（自動再起動）
```bash
npm run dev
```

## 設定

### Pusher設定
`local_calculator.js`内のPusher設定を更新：
```javascript
const pusher = new Pusher({
  appId: 'YOUR_APP_ID',
  key: 'YOUR_KEY',
  secret: 'YOUR_SECRET',
  cluster: 'ap3', // リージョンに合わせて変更
  useTLS: true
});
```

### 計算パラメータ調整
- `CPU_WORKERS`: 使用するワーカー数（デフォルト: CPUコア数-1）
- `BATCH_SIZE`: 1ワーカーあたりの計算回数
- `UPDATE_INTERVAL`: 統計更新間隔（ミリ秒）

## 出力例

```
=== AMD CPU/GPU Pi Calculator ===
CPU Cores: 16
Worker Threads: 15
GPU Mode: Disabled
==================================

--- Statistics ---
Elapsed Time: 10.5s
Total Iterations: 150,000,000
Iterations/sec: 14,285,714
Pi Estimate: 3.141592653589793
Active Workers: 15/15
Data sent to Pusher
```

## ハードウェア最適化

### AMD Ryzen CPU
- 全物理コア+スレッドを活用
- メモリ帯域幅を考慮したバッチサイズ調整

### AMD Radeon GPU
- GPU.jsによる並列計算
- メモリ転送を最小化する設計

## トラブルシューティング

### GPUが検出されない場合
1. GPUドライバが最新か確認
2. `gpu.js`の互換性を確認
3. CPUフォールバックモードを使用

### 通信エラー
1. PusherのAPIキーを確認
2. ネットワーク接続を確認
3. ファイアウォール設定を確認

## ライセンス

MIT