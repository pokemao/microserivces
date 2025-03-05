import { View } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'
import { Input, Button } from '@nutui/nutui-react-taro'
import styles from './index.module.less'
import { useCallback, useState } from 'react'
import { postApi } from '@/api'
import { to } from '@/utils'
import { useDebounce } from '@/hook'

export default function PostCreate () {
  useLoad(() => {
    console.log('Page loaded.')
  })
  const [title, setTitle] = useState('')
  const createPostDebounced = useDebounce(postApi.createPost)
  const submit = useCallback(async () => {
    const tmp = title?.trim()
    if (!tmp) {
      return Taro.showToast({
        title: '请输入title',
        icon: 'none'
      })
    }
    const [err, data] = await to(createPostDebounced({title: tmp}))
    if (err) {
      return Taro.showToast({
        title: '请求失败',
        icon: 'none'
      })
    }
    console.log('data', data);
    setTitle('')
  }, [createPostDebounced, title])
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
          placeholder='请输入post的title'
        />
        <Button type='info' onClick={() => submit()}>提交</Button>
      </View>
    </View>
  )
}
