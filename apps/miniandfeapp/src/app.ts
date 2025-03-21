import { PropsWithChildren } from 'react'
import Taro, { useLaunch } from '@tarojs/taro'
import '@nutui/nutui-react-taro/dist/style.css'
import { debug } from '@/utils/index'
import './app.less'

const syzlog = debug('microservices:apps:miniandfeapp:src:app.ts')

function App({ children }: PropsWithChildren<any>) {
  useLaunch(() => {
    syzlog('App launched.')
  })
  // children 是将要会渲染的页面
  return children
}



export default App
