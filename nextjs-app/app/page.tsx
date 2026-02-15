'use client'

import { useState, useEffect, useCallback } from 'react'
import PiDisplay from '@/components/PiDisplay'
import PerformanceChart from '@/components/PerformanceChart'
import ConnectionStatus from '@/components/ConnectionStatus'
import { subscribeToPiCalculations, monitorConnection, PiCalculationData } from '@/lib/pusher-client'
import { Cpu, Zap, PieChart } from 'lucide-react'

interface PerformanceDataPoint {
  timestamp: number
  iterationsPerSecond: number
  piValue: number
  activeWorkers: number
}

export default function Home() {
  const [piData, setPiData] = useState<PiCalculationData | null>(null)
  const [performanceData, setPerformanceData] = useState<PerformanceDataPoint[]>([])
  const [isConnected, setIsConnected] = useState(false)
  const [lastMessageTime, setLastMessageTime] = useState<Date | null>(null)
  
  // データ更新ハンドラ
  const handleDataUpdate = useCallback((data: PiCalculationData) => {
    setPiData(data)
    setLastMessageTime(new Date())
    
    // パフォーマンスデータに追加
    setPerformanceData(prev => [
      ...prev,
      {
        timestamp: data.timestamp,
        iterationsPerSecond: data.iterationsPerSecond,
        piValue: parseFloat(data.pi) || 3.1415926535,
        activeWorkers: data.activeWorkers
      }
    ])
  }, [])
  
  // 接続状態監視
  useEffect(() => {
    const unsubscribeConnection = monitorConnection(
      () => setIsConnected(true),
      () => setIsConnected(false)
    )
    
    return unsubscribeConnection
  }, [])
  
  // Pusher購読
  useEffect(() => {
    const unsubscribe = subscribeToPiCalculations(handleDataUpdate)
    
    return () => {
      unsubscribe()
    }
  }, [handleDataUpdate])
  
  // サンプルデータ（デモ用）
  useEffect(() => {
    if (!piData && performanceData.length === 0) {
      // 初期デモデータ
      const demoData: PerformanceDataPoint[] = []
      const now = Date.now()
      
      for (let i = 0; i < 10; i++) {
        demoData.push({
          timestamp: now - (10 - i) * 1000,
          iterationsPerSecond: 1000000 + Math.random() * 500000,
          piValue: 3.1415926535 + (Math.random() - 0.5) * 0.0000001,
          activeWorkers: 8
        })
      }
      
      setPerformanceData(demoData)
      setPiData({
        pi: '3.141592653589793',
        iterations: 15000000,
        iterationsPerSecond: 1250000,
        activeWorkers: 8,
        timestamp: now
      })
      setLastMessageTime(new Date(now))
    }
  }, [piData, performanceData.length])
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* ヘッダー */}
        <header className="mb-8 md:mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                AMD Pi Calculator Dashboard
              </h1>
              <p className="text-gray-400 mt-2">
                Real-time π calculation using AMD CPU/GPU with WebSocket streaming
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="flex items-center px-4 py-2 bg-primary/10 rounded-lg">
                <Cpu className="w-5 h-5 text-primary mr-2" />
                <span className="font-medium">AMD Ryzen</span>
              </div>
              <div className="flex items-center px-4 py-2 bg-purple-500/10 rounded-lg">
                <Zap className="w-5 h-5 text-purple-500 mr-2" />
                <span className="font-medium">GPU Accelerated</span>
              </div>
              <div className="flex items-center px-4 py-2 bg-green-500/10 rounded-lg">
                <PieChart className="w-5 h-5 text-green-500 mr-2" />
                <span className="font-medium">Real-time</span>
              </div>
            </div>
          </div>
        </header>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* メインコンテンツ */}
          <div className="lg:col-span-2 space-y-6">
            <PiDisplay
              piValue={piData?.pi || '3.141592653589793'}
              iterations={piData?.iterations || 0}
              iterationsPerSecond={piData?.iterationsPerSecond || 0}
              activeWorkers={piData?.activeWorkers || 0}
              lastUpdate={lastMessageTime}
            />
            
            <PerformanceChart data={performanceData} />
          </div>
          
          {/* サイドバー */}
          <div className="space-y-6">
            <ConnectionStatus 
              isConnected={isConnected} 
              lastMessageTime={lastMessageTime} 
            />
            
            {/* システム情報 */}
            <div className="glass-effect rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4">Hardware Info</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">CPU Utilization</span>
                    <span className="font-medium">~95%</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                      style={{ width: '95%' }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">GPU Utilization</span>
                    <span className="font-medium">~85%</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                      style={{ width: '85%' }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">Memory Usage</span>
                    <span className="font-medium">~12GB/32GB</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
                      style={{ width: '37%' }}
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-800">
                <h4 className="font-medium mb-2">Calculation Method</h4>
                <div className="text-sm text-gray-400 space-y-1">
                  <p>• Monte Carlo π estimation</p>
                  <p>• Worker Threads: {piData?.activeWorkers || 8} threads</p>
                  <p>• Batch Size: 1,000,000 iterations</p>
                  <p>• Precision: 15 decimal places</p>
                </div>
              </div>
            </div>
            
            {/* クイックアクション */}
            <div className="glass-effect rounded-xl p-6">
              <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <button className="w-full px-4 py-3 bg-primary/20 hover:bg-primary/30 rounded-lg text-primary font-medium transition-colors">
                  Start Calculation
                </button>
                <button className="w-full px-4 py-3 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg text-purple-500 font-medium transition-colors">
                  Enable GPU Mode
                </button>
                <button className="w-full px-4 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-medium transition-colors">
                  Export Data
                </button>
                <button className="w-full px-4 py-3 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-500 font-medium transition-colors">
                  Stop Calculation
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* フッター */}
        <footer className="mt-12 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>
            AMD Pi Calculator Dashboard • Real-time WebSocket streaming • 
            Built with Next.js 14 & Tailwind CSS • 
            Deploy on <a href="https://vercel.com" className="text-primary hover:underline">Vercel</a>
          </p>
          <p className="mt-2">
            Replace Pusher keys in <code className="bg-gray-800 px-2 py-1 rounded">lib/pusher-client.ts</code> and 
            <code className="bg-gray-800 px-2 py-1 rounded mx-2">local_calculator.js</code>
          </p>
        </footer>
      </div>
    </div>
  )
}