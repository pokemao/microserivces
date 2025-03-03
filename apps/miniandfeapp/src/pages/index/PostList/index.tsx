import Taro, { useLoad } from '@tarojs/taro'
import { Button, Input } from '@nutui/nutui-react-taro'
import styles from './index.module.less'
import { View } from '@tarojs/components'
import { postApi } from '@/api'
import { useCallback, useEffect, useState } from 'react'
import { debounce, to } from '@/utils'
import { useDebounce } from '@/hook'
import PostCard from './PostCard'

export type post = {
  id: string,
  title: string,
}
export type postMap = Record<string, post>

export default function PostList () {
  useLoad(() => {
    console.log('Page loaded.')
  })
  const getPostsDebounced = useDebounce(postApi.getPosts, [postApi.getPosts])
  const [postMap, setPostMap] = useState<postMap>({})
  const getPostMapFromNetwork = useCallback(async () => {
    const [err, data] = await to(getPostsDebounced())
    if (err) {
      console.log('err', err);
      return Taro.showToast({
        title: '请求失败',
        icon: 'none'
      })
    }
    console.log('data', data);
    setPostMap(data as unknown as postMap)
  }, [getPostsDebounced])
  useEffect(() => {
    getPostMapFromNetwork()
  }, [getPostMapFromNetwork])

  return (
    <View className={styles.wrap}>
      {
        Reflect.ownKeys(postMap).map(key => {
          return <PostCard key={key as string} post={postMap[key as string]} />
        })
      }
    </View>
  )
}
