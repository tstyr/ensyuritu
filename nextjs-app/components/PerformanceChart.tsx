'use client'

import { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'

interface PerformanceData {
  timestamp: number
  iterationsPerSecond: number
  piValue: number
  activeWorkers: number
}

interface PerformanceChartProps {
  data: PerformanceData[]
}

export default function PerformanceChart({ data }: PerformanceChartProps) {
  const [chartData, setChartData] = useState<PerformanceData[]>([])
  
  useEffect(() => {
    if (data.length > 0) {
      // 最新の20データポイントを表示
      const recentData = data.slice(-20)
      setChartData(recentData)
    }
  }, [data])
  
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp)
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`
  }
  
  const formatIterations = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
    if (value >= 1000) return `${(value / 1000).toFixed(1)}K`
    return value.toString()
  }
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-effect rounded-lg p-4 border border-gray-700">
          <p className="text-sm text-gray-400">{formatTime(label)}</p>
          <p className="text-primary font-bold">
            Speed: {formatIterations(payload[0].value)}/s
          </p>
          <p className="text-green-500">
            π: {payload[1]?.value?.toFixed(10) || '3.1415926535'}
          </p>
          <p className="text-blue-500">
            Workers: {payload[2]?.value || 0}
          </p>
        </div>
      )
    }
    return null
  }
  
  return (
    <div className="glass-effect rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Performance Metrics</h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-primary mr-2" />
            <span className="text-gray-400">Speed (iterations/s)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2" />
            <span className="text-gray-400">π Value</span>
          </div>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis 
              dataKey="timestamp" 
              tickFormatter={formatTime}
              stroke="#9CA3AF"
              fontSize={12}
            />
            <YAxis 
              stroke="#9CA3AF"
              fontSize={12}
              tickFormatter={formatIterations}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="iterationsPerSecond"
              stroke="#3B82F6"
              fill="url(#colorSpeed)"
              strokeWidth={2}
              name="Speed"
            />
            <Area
              type="monotone"
              dataKey="piValue"
              stroke="#10B981"
              fill="url(#colorPi)"
              strokeWidth={2}
              name="π Value"
              yAxisId={1}
              hide
            />
            <defs>
              <linearGradient id="colorSpeed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorPi" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
            </defs>
          </AreaChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">
            {chartData.length > 0 ? formatIterations(chartData[chartData.length - 1]?.iterationsPerSecond || 0) : '0'}
          </div>
          <div className="text-gray-400">Current Speed</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-500">
            {chartData.length > 0 ? chartData[chartData.length - 1]?.piValue?.toFixed(8) || '3.14159265' : '3.14159265'}
          </div>
          <div className="text-gray-400">Current π</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-500">
            {chartData.length > 0 ? chartData[chartData.length - 1]?.activeWorkers || 0 : 0}
          </div>
          <div className="text-gray-400">Active Workers</div>
        </div>
      </div>
    </div>
  )
}