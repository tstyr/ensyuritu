# 🚀 AMD円周率計算システム - 簡単スタートガイド

## 📦 必要なもの
- Node.js 16以上（インストール済み）
- インターネット接続

## ⚡ 超簡単起動方法

### 方法1: すべて一度に起動（推奨）
```
start-all.bat をダブルクリック
```
これで、ダッシュボードと計算エンジンが両方起動します！

### 方法2: 個別に起動
1. **ダッシュボードのみ起動**
   ```
   start-dashboard.bat をダブルクリック
   ```
   ブラウザで http://localhost:3000 を開く

2. **計算エンジンのみ起動**
   ```
   start-calculator.bat をダブルクリック
   ```

## 🎯 起動後の確認

### ブラウザ（http://localhost:3000）で確認すること：
1. **接続状態**: 右側に「Connected」と表示される
2. **円周率**: 大きく表示される（3.14159...）
3. **統計情報**:
   - Iterations（試行回数）
   - Speed（計算速度）
   - Active Workers（ワーカー数）
4. **パフォーマンスグラフ**: リアルタイムで更新される

### ターミナルで確認すること：
```
--- Statistics ---
Elapsed Time: 10.5s
Total Iterations: 150,000,000
Iterations/sec: 14,285,714
Pi Estimate: 3.141592653589793
Active Workers: 11/11
Data sent to Pusher ✓
```

## 🔧 トラブルシューティング

### ダッシュボードにデータが表示されない場合

1. **ブラウザのコンソールを開く**（F12キー）
2. 以下のログを確認：
   ```
   Setting up Pusher connection...
   Pusher state changed: initialized -> connecting
   Pusher state changed: connecting -> connected
   Pusher connected!
   Subscribing to pi-calculations channel...
   Received data from Pusher: {...}
   ```

3. **計算エンジンのターミナルを確認**：
   ```
   Sending to Pusher: {"pi":"3.141...","iterations":...}
   Data sent to Pusher ✓
   ```

### よくある問題と解決方法

#### 問題1: 「Connected」と表示されるがデータが来ない
**解決方法**:
1. 計算エンジンが起動しているか確認
2. 両方のターミナルを閉じて、`start-all.bat`で再起動

#### 問題2: 「Disconnected」と表示される
**解決方法**:
1. インターネット接続を確認
2. Pusher設定を確認（すでに設定済みのはず）
3. ファイアウォールを確認

#### 問題3: ポート3000が使用中
**解決方法**:
1. 既存のNext.jsアプリを停止
2. または、`nextjs-app/package.json`で別のポートを指定

## 📊 Pusher設定（確認用）

すでに設定済みです：
```
✅ App ID: 2115739
✅ Key: ee031210b68879ca2771
✅ Cluster: ap3 (Tokyo)
```

## 🛑 停止方法

各ターミナルウィンドウで `Ctrl+C` を押すか、ウィンドウを閉じる

## 💡 ヒント

- **計算速度を上げる**: AMD CPUの全コアを使用しているので、すでに最速です
- **複数ブラウザで表示**: 同じURLを複数のブラウザで開けます
- **長時間実行**: 何時間でも実行可能です

## 🎊 成功の確認

ダッシュボードで以下が表示されていればOK：
- ✅ 円周率が表示されている
- ✅ 試行回数が増えている
- ✅ グラフが動いている
- ✅ 「Connected」と表示されている

## 📞 それでも動かない場合

1. Node.jsのバージョンを確認: `node --version`（16以上が必要）
2. 依存関係を再インストール:
   ```
   cd local-calculator
   npm install
   cd ../nextjs-app
   npm install
   ```
3. すべてのターミナルを閉じて、PCを再起動
4. `start-all.bat`を再実行