const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');
const os = require('os');
const Pusher = require('pusher');
const GPU = require('gpu.js').GPU;
const si = require('systeminformation');

// Pusher設定（完全な設定が必要です）
const pusher = new Pusher({
  appId: 'YOUR_APP_ID', // Pusherダッシュボードから取得
  key: 'cfLkDVi1qq3tgvhK8_KSu3WFqjL_6BK1NI-IIL8q8KY',
  secret: 'YOUR_SECRET', // Pusherダッシュボードから取得
  cluster: 'ap3', // リージョンに合わせて変更
  useTLS: true
});

// 計算設定
const CPU_WORKERS = Math.max(1, os.cpus().length - 1); // 全コア使用（1つはメイン用）
const BATCH_SIZE = 1000000; // 1ワーカーあたりの計算回数
const UPDATE_INTERVAL = 1000; // 更新間隔（ms）

// グローバル統計
let totalIterations = 0;
let totalInsideCircle = 0;
let startTime = Date.now();
let isGPUMode = process.argv.includes('--gpu');

// モンテカルロ法による円周率計算（CPU用）
function calculatePiMonteCarlo(iterations) {
  let insideCircle = 0;
  
  for (let i = 0; i < iterations; i++) {
    const x = Math.random();
    const y = Math.random();
    const distance = x * x + y * y;
    
    if (distance <= 1) {
      insideCircle++;
    }
  }
  
  return {
    insideCircle,
    iterations
  };
}

// GPU用の円周率計算カーネル
function createGPUPiKernel() {
  const gpu = new GPU();
  
  return gpu.createKernel(function(iterations) {
    let inside = 0;
    
    for (let i = 0; i < this.constants.iterationsPerThread; i++) {
      const x = Math.random();
      const y = Math.random();
      
      if (x * x + y * y <= 1.0) {
        inside++;
      }
    }
    
    return inside;
  })
  .setOutput([CPU_WORKERS])
  .setConstants({
    iterationsPerThread: Math.floor(BATCH_SIZE / CPU_WORKERS)
  });
}

// ワーカースレッド用コード
if (!isMainThread) {
  const { workerId, iterations, useGPU } = workerData;
  
  if (useGPU) {
    // GPU計算（この例ではCPUでエミュレート）
    const result = calculatePiMonteCarlo(iterations);
    parentPort.postMessage(result);
  } else {
    // CPU計算
    const result = calculatePiMonteCarlo(iterations);
    parentPort.postMessage(result);
  }
  
  return;
}

// メインスレッド
async function main() {
  console.log('=== AMD CPU/GPU Pi Calculator ===');
  console.log(`CPU Cores: ${os.cpus().length}`);
  console.log(`Worker Threads: ${CPU_WORKERS}`);
  console.log(`GPU Mode: ${isGPUMode ? 'Enabled' : 'Disabled'}`);
  console.log('==================================\n');
  
  // システム情報取得
  try {
    const cpuInfo = await si.cpu();
    const gpuInfo = await si.graphics();
    
    console.log('CPU Info:', cpuInfo.manufacturer, cpuInfo.brand);
    console.log('GPU Info:', gpuInfo.controllers[0]?.model || 'Not detected');
  } catch (err) {
    console.log('System info error:', err.message);
  }
  
  // ワーカー管理
  const workers = [];
  let activeWorkers = 0;
  
  // ワーカー作成関数
  function createWorker(workerId) {
    return new Promise((resolve) => {
      const worker = new Worker(__filename, {
        workerData: {
          workerId,
          iterations: BATCH_SIZE,
          useGPU: isGPUMode
        }
      });
      
      worker.on('message', (result) => {
        totalIterations += result.iterations;
        totalInsideCircle += result.insideCircle;
        activeWorkers--;
        
        // 次のバッチを開始
        setTimeout(() => startWorkerBatch(), 0);
      });
      
      worker.on('error', (err) => {
        console.error(`Worker ${workerId} error:`, err);
        activeWorkers--;
        setTimeout(() => startWorkerBatch(), 1000);
      });
      
      worker.on('exit', (code) => {
        if (code !== 0) {
          console.error(`Worker ${workerId} exited with code ${code}`);
        }
      });
      
      workers.push(worker);
      resolve(worker);
    });
  }
  
  // ワーカーバッチ開始
  function startWorkerBatch() {
    while (activeWorkers < CPU_WORKERS) {
      activeWorkers++;
      createWorker(workers.length)
        .then(worker => worker.postMessage('start'));
    }
  }
  
  // 初期ワーカー作成
  for (let i = 0; i < CPU_WORKERS; i++) {
    await createWorker(i);
  }
  
  // 統計更新ループ
  setInterval(() => {
    const elapsedSeconds = (Date.now() - startTime) / 1000;
    const piEstimate = totalIterations > 0 
      ? (4 * totalInsideCircle / totalIterations).toFixed(15)
      : '0';
    
    const iterationsPerSecond = Math.floor(totalIterations / elapsedSeconds);
    
    // 統計表示
    console.log(`\n--- Statistics ---`);
    console.log(`Elapsed Time: ${elapsedSeconds.toFixed(1)}s`);
    console.log(`Total Iterations: ${totalIterations.toLocaleString()}`);
    console.log(`Iterations/sec: ${iterationsPerSecond.toLocaleString()}`);
    console.log(`Pi Estimate: ${piEstimate}`);
    console.log(`Active Workers: ${activeWorkers}/${CPU_WORKERS}`);
    
    // Pusherでデータ送信
    try {
      pusher.trigger('pi-calculations', 'update', {
        pi: piEstimate,
        iterations: totalIterations,
        iterationsPerSecond: iterationsPerSecond,
        activeWorkers: activeWorkers,
        timestamp: Date.now()
      });
      
      console.log('Data sent to Pusher');
    } catch (err) {
      console.error('Pusher error:', err.message);
    }
  }, UPDATE_INTERVAL);
  
  // 初期バッチ開始
  startWorkerBatch();
  
  console.log('\nCalculation started. Press Ctrl+C to stop.');
  
  // 終了処理
  process.on('SIGINT', () => {
    console.log('\nShutting down workers...');
    workers.forEach(worker => worker.terminate());
    process.exit(0);
  });
}

// エントリーポイント
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { calculatePiMonteCarlo, createGPUPiKernel };