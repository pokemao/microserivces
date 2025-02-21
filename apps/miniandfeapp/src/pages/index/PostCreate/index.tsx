import { View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { Input, Button } from '@nutui/nutui-react-taro'
import styles from './index.module.less'
import { useState } from 'react'
import { postApi } from '@/api'

export default function PostCreate () {
  useLoad(() => {
    console.log('Page loaded.')
  })
  const [title, setTitle] = useState('')
  const submit = () => {
    postApi.createPost({title})
  }
  return (
    <View className={styles.wrap}>
      <View className={styles.title}>Create Post</View>
      <View className={styles['operation-area']}>
        <View>Title</View>
        <Input
          style={{
            '--nutui-input-background-color': '#f1f1f1',
            '--nutui-input-border-radius': '10rpx'
          }}
          value={title}
          onChange={val => setTitle(val)}
          placeholder="请输入post的title"
        />
        <Button type="info" onClick={() => submit()}>提交</Button>
      </View>
    </View>
  )
}
