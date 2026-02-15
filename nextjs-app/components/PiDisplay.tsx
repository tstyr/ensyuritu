'use client'

import { useEffect, useState } from 'react'
import { Cpu, Gauge, Clock, Hash, Activity } from 'lucide-react'

interface PiDisplayProps {
  piValue: string
  iterations: number
  iterationsPerSecond: number
  activeWorkers: number
  lastUpdate: Date | null
}

export default function PiDisplay({
  piValue,
  iterations,
  iterationsPerSecond,
  activeWorkers,
  lastUpdate
}: PiDisplayProps) {
  const [displayedPi, setDisplayedPi] = useState('3.')
  const [digitIndex, setDigitIndex] = useState(0)
  
  // 円周率の桁をアニメーション表示
  useEffect(() => {
    if (piValue && piValue.length > 2) {
      const piDigits = piValue.substring(2) // "3."を除いた部分
      
      if (digitIndex < piDigits.length) {
        const timer = setTimeout(() => {
          setDisplayedPi(prev => prev + piDigits[digitIndex])
          setDigitIndex(prev => prev + 1)
        }, 50) // 50msごとに1桁表示
        
        return () => clearTimeout(timer)
      }
    }
  }, [piValue, digitIndex])
  
  // 新しい円周率値が来たらリセット
  useEffect(() => {
    if (piValue && piValue !== `3.${displayedPi.substring(2)}`) {
      setDisplayedPi('3.')
      setDigitIndex(0)
    }
  }, [piValue])
  
  // 最後の更新からの経過時間
  const getTimeSinceUpdate = () => {
    if (!lastUpdate) return 'Never'
    
    const seconds = Math.floor((Date.now() - lastUpdate.getTime()) / 1000)
    
    if (seconds < 60) return `${seconds}s ago`
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    return `${Math.floor(seconds / 3600)}h ago`
  }
  
  return (
    <div className="space-y-6">
      {/* 円周率表示 */}
      <div className="glass-effect rounded-2xl p-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gradient">π Calculation</h2>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Clock className="w-4 h-4" />
            <span>Updated {getTimeSinceUpdate()}</span>
          </div>
        </div>
        
        <div className="font-mono text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          <span className="text-primary">3.</span>
          <span className="animate-gradient bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
            {displayedPi.substring(2) || '141592653589793'}
          </span>
          {displayedPi.length < piValue?.length && (
            <span className="text-gray-400 animate-pulse">▋</span>
          )}
        </div>
        
        <div className="mt-4 text-sm text-gray-400">
          Total digits calculated: {displayedPi.length - 2}
        </div>
      </div>
      
      {/* 統計カード */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-effect rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Iterations</p>
              <p className="text-2xl font-bold mt-1">
                {iterations.toLocaleString()}
              </p>
            </div>
            <div className="p-3 bg-primary/10 rounded-lg">
              <Hash className="w-6 h-6 text-primary" />
            </div>
          </div>
          <div className="mt-4 h-2 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full"
              style={{ 
                width: `${Math.min(100, (iterations % 10000000) / 100000)}%` 
              }}
            />
          </div>
        </div>
        
        <div className="glass-effect rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Speed</p>
              <p className="text-2xl font-bold mt-1">
                {iterationsPerSecond.toLocaleString()}/s
              </p>
            </div>
            <div className="p-3 bg-green-500/10 rounded-lg">
              <Gauge className="w-6 h-6 text-green-500" />
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-400">
            {iterationsPerSecond > 1000000 ? 'High performance' : 'Calculating...'}
          </div>
        </div>
        
        <div className="glass-effect rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Active Workers</p>
              <p className="text-2xl font-bold mt-1">{activeWorkers}</p>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <Cpu className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-400">
            AMD CPU Threads
          </div>
        </div>
        
        <div className="glass-effect rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Accuracy</p>
              <p className="text-2xl font-bold mt-1">
                {piValue ? piValue.substring(0, 10) : '3.14159265'}
              </p>
            </div>
            <div className="p-3 bg-purple-500/10 rounded-lg">
              <Activity className="w-6 h-6 text-purple-500" />
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-400">
            Current π estimate
          </div>
        </div>
      </div>
    </div>
  )
}