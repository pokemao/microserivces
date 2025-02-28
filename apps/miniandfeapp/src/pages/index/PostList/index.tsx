import { useLoad } from '@tarojs/taro'
import { Button, Input } from '@nutui/nutui-react-taro'
import styles from './index.module.less'
import { View } from '@tarojs/components'
import { postApi } from '@/api'
import { useState } from 'react'
import { to } from '@/utils'

export default function PostList () {
  useLoad(() => {
    console.log('Page loaded.')
  })
  const [val, setVal] = useState('')
  const submit = async () => {
    const [err, data] = await to(postApi.getPosts())
    if (err) {
      console.log(err)
    }
  }

  return (
    <View className={styles.wrap}>
      <View className={styles.title}>Create Post</View>
      <View className={styles['operation-area']}>
        <View>
          <View>1 comments</View>
          <View className={styles['comment-list']}>
            <View className={styles['comment-item']}>
              <View className={styles.icon}></View>
              <View className={styles.content}>1111</View>
            </View>
          </View>
          <View>Comment</View>
        </View>
        <Input
          style={{
            '--nutui-input-background-color': '#fff',
            '--nutui-input-border-radius': '10rpx',
            '--nutui-input-padding': '10rpx 25rpx'
          }}
          value={val}
          onChange={val => setVal(val)}
          placeholder='请输入comment'
        />
        <Button type='info' onClick={() => submit()}>提交</Button>
      </View>
    </View>
  )
}
