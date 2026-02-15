import PusherClient from 'pusher-js'

// Pusherクライアント設定
export const pusherClient = new PusherClient('YOUR_KEY', {
  cluster: 'ap3',
  forceTLS: true
})

// イベントタイプ
export interface PiCalculationData {
  pi: string
  iterations: number
  iterationsPerSecond: number
  activeWorkers: number
  timestamp: number
}

// チャンネル購読関数
export function subscribeToPiCalculations(
  onUpdate: (data: PiCalculationData) => void
) {
  const channel = pusherClient.subscribe('pi-calculations')
  
  channel.bind('update', onUpdate)
  
  return () => {
    channel.unbind('update', onUpdate)
    pusherClient.unsubscribe('pi-calculations')
  }
}

// 接続状態監視
export function monitorConnection(
  onConnected: () => void,
  onDisconnected: () => void
) {
  pusherClient.connection.bind('connected', onConnected)
  pusherClient.connection.bind('disconnected', onDisconnected)
  
  return () => {
    pusherClient.connection.unbind('connected', onConnected)
    pusherClient.connection.unbind('disconnected', onDisconnected)
  }
}