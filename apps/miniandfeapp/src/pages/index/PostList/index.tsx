import Taro, { useLoad } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { postApi } from '@/api'
import { useCallback, useEffect, useState } from 'react'
import { to } from '@/utils'
import { useDebounce } from '@/hook'
import { debug } from '@/utils/index'
import { queryApi } from '@/api/queryApi'
// import debug from 'debug'
import styles from './index.module.less'
import PostCard from './PostCard'

const syzlog = debug('microservices:apps:miniandfeapp:src:pages:index:PostList:index.tsx')


export type post = {
  id: string,
  title: string,
}
export type postMap = Record<string, post>

export type query = {
  id: string,
  title: string,
  comments: {
    id: string,
    content: string,
    status: 'pending' | 'approved' | 'rejected'
  }[]
}
export type queryMap = Record<string, query>

export default function PostList () {
  useLoad(() => {
    syzlog('Page loaded.')
  })
  // 改用query服务获取posts和comments
  // const getPostsDebounced = useDebounce(postApi.getPosts, [postApi.getPosts])
  // const [postMap, setPostMap] = useState<postMap>({})
  // const getPostMapFromNetwork = useCallback(async () => {
  //   const [err, data] = await to(getPostsDebounced())
  //   if (err) {
  //     syzlog('err', err);
  //     return Taro.showToast({
  //       title: '请求失败',
  //       icon: 'none'
  //     })
  //   }
  //   syzlog('data', data);
  //   setPostMap(data as unknown as postMap)
  // }, [getPostsDebounced])
  // useEffect(() => {
  //   getPostMapFromNetwork()
  // }, [getPostMapFromNetwork])

  const getQueryPostsDebounced = useDebounce(queryApi.getQuery, [queryApi.getQuery])
  const [query, setQuery] = useState<queryMap>({})
  const getQueryFromNetwork = useCallback(async () => {
    const [err, data] = await to(getQueryPostsDebounced())
    if (err) {
      syzlog('err', err);
      return Taro.showToast({
        title: '请求失败',
        icon: 'none'
      })
    }
    syzlog('data', data);
    setQuery(data as unknown as queryMap)
  }, [getQueryPostsDebounced])
  useEffect(() => {
    getQueryFromNetwork()
  }, [getQueryFromNetwork])

  return (
    <View className={styles.wrap}>
      {/* {
        Reflect.ownKeys(postMap).map(key => {
          return <PostCard key={key as string} post={postMap[key as string]} />
        })
      } */}
      {
        Reflect.ownKeys(query).map(key => {
          return <PostCard key={key as string} query={query[key as string]} />
        })
      }
    </View>
  )
}
