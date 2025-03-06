import { View, Text, PageMeta, NavigationBar } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { debug } from '@/utils/index'
// import debug from 'debug'
import styles from './index.module.less'
import PostCreate from './PostCreate'
import PostList from './PostList'

const syzlog = debug('microservices:apps:miniandfeapp:src:pages:index:index.tsx')

export default function Index () {
  useLoad(() => {
    syzlog('Page loaded.')
  })
  const myPageStyle = "color: 'green'"
  const title = '首页2'
  const handleScroll = (e) => {
    syzlog(e)
  }

  return (
    <>
      <PageMeta
        pageStyle={myPageStyle}
        onScroll={handleScroll}
      >
        <NavigationBar title={title} />
      </PageMeta>
      <View className={styles.wrap}>
        <PostCreate />
        <PostList />
      </View>
    </>
  )
}
