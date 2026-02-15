'use client'

import { useState, useEffect } from 'react'
import { Wifi, WifiOff, Server, Cpu, Zap } from 'lucide-react'

interface ConnectionStatusProps {
  isConnected: boolean
  lastMessageTime: Date | null
}

export default function ConnectionStatus({ 
  isConnected, 
  lastMessageTime 
}: ConnectionStatusProps) {
  const [latency, setLatency] = useState<number | null>(null)
  
  useEffect(() => {
    if (isConnected && lastMessageTime) {
      const interval = setInterval(() => {
        const now = new Date()
        const diff = now.getTime() - lastMessageTime.getTime()
        setLatency(diff)
      }, 1000)
      
      return () => clearInterval(interval)
    } else {
      setLatency(null)
    }
  }, [isConnected, lastMessageTime])
  
  const getStatusColor = () => {
    if (!isConnected) return 'text-red-500'
    if (latency && latency > 1000) return 'text-yellow-500'
    return 'text-green-500'
  }
  
  const getStatusText = () => {
    if (!isConnected) return 'Disconnected'
    if (latency && latency > 1000) return 'High Latency'
    return 'Connected'
  }
  
  const getLatencyText = () => {
    if (!latency) return '--'
    if (latency < 100) return '<100ms'
    if (latency < 500) return '<500ms'
    if (latency < 1000) return '<1s'
    return `${Math.floor(latency / 1000)}s`
  }
  
  return (
    <div className="glass-effect rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">System Status</h3>
        <div className={`flex items-center ${getStatusColor()}`}>
          {isConnected ? (
            <Wifi className="w-5 h-5 mr-2" />
          ) : (
            <WifiOff className="w-5 h-5 mr-2" />
          )}
          <span className="font-medium">{getStatusText()}</span>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="p-2 bg-blue-500/10 rounded-lg mr-3">
              <Server className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="font-medium">Connection</p>
              <p className="text-sm text-gray-400">Pusher WebSocket</p>
            </div>
          </div>
          <div className="text-right">
            <p className={`font-bold ${getStatusColor()}`}>
              {isConnected ? 'Live' : 'Offline'}
            </p>
            <p className="text-sm text-gray-400">
              Latency: {getLatencyText()}
            </p>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="p-2 bg-purple-500/10 rounded-lg mr-3">
              <Cpu className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <p className="font-medium">AMD CPU</p>
              <p className="text-sm text-gray-400">Ryzen Threads</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-purple-500">Optimized</p>
            <p className="text-sm text-gray-400">Worker Threads</p>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="p-2 bg-pink-500/10 rounded-lg mr-3">
              <Zap className="w-5 h-5 text-pink-500" />
            </div>
            <div>
              <p className="font-medium">AMD GPU</p>
              <p className="text-sm text-gray-400">Radeon Acceleration</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-pink-500">Available</p>
            <p className="text-sm text-gray-400">CPU Optimized</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-800">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Last Update</span>
          <span className="font-medium">
            {lastMessageTime 
              ? lastMessageTime.toLocaleTimeString() 
              : 'Never'
            }
          </span>
        </div>
        <div className="flex justify-between text-sm mt-2">
          <span className="text-gray-400">Protocol</span>
          <span className="font-medium">WebSocket (Pusher)</span>
        </div>
      </div>
    </div>
  )
}