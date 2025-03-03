import Taro, { useLoad } from '@tarojs/taro'
import { Button, Input } from '@nutui/nutui-react-taro'
import styles from './index.module.less'
import { View } from '@tarojs/components'
import { commentApi } from '@/api'
import { useCallback, useEffect, useState } from 'react'
import {post as postType} from '@/pages/index/PostList/index'
import { useDebounce } from '@/hook'
import { to } from '@/utils'

type postCardParams = {
  post: postType
}

type commentType = {
  id: string;
  content: string;
 }

export default function PostCard (props: postCardParams) {
  const { post } = props
  useLoad(() => {
    console.log('Page loaded.')
  })
  const [comment, setComment] = useState('')
  const createCommentDebounced = useDebounce(commentApi.createComment, [commentApi.createComment])
  const createComment = useCallback(async () => {
    const [err, data] = await to(createCommentDebounced(post.id, {content: comment}))
    if (err) {
      return Taro.showToast({
        title: '请求失败',
        icon: 'none'
      })
    }
    console.log('data', data);
    setComment('')
  }, [post.id, createCommentDebounced, comment])

  const [commentList, setCommentList] = useState<commentType[]>([])
  const getCommentsDebounced = useDebounce(commentApi.getComments, [commentApi.getComments])
  const getComments = useCallback(async () => {
    const [err, data] = await to(getCommentsDebounced(post.id))
    if (err) {
      return Taro.showToast({
        title: '请求失败',
        icon: 'none'
      })
    }
    console.log('data', data);
    setCommentList(data as unknown as commentType[])
  }, [post.id, getCommentsDebounced])

  useEffect(() => {
    getComments()
  }, [getComments])

  return (
    <View className={styles.wrap}>
      <View className={styles.title}>{post.title}</View>
      <View className={styles['operation-area']}>
        <View>
          <View>{commentList.length + ' comments'}</View>
          {
            commentList.map(item => {
            return (<View className={styles['comment-list']} key={item.id}>
              <View className={styles['comment-item']}>
                <View className={styles.icon}></View>
                <View className={styles.content}>{item.content}</View>
              </View>
            </View>)
            })
          }
          <View>Comment</View>
        </View>
        <Input
          style={{
            '--nutui-input-background-color': '#fff',
            '--nutui-input-border-radius': '10rpx',
            '--nutui-input-padding': '10rpx 25rpx'
          }}
          value={comment}
          onChange={val => setComment(val)}
          placeholder='请输入comment'
        />
        <Button type='info' onClick={() => createComment()}>提交</Button>
      </View>
    </View>
  )
}
