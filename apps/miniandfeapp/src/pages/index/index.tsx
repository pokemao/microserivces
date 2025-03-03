import { View, Text, PageMeta, NavigationBar } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import { Button } from '@nutui/nutui-react-taro'
import styles from './index.module.less'
import PostCreate from './PostCreate'
import PostCard from './PostList/PostCard'
import PostList from './PostList'

export default function Index () {
  useLoad(() => {
    console.log('Page loaded.')
  })
  const myPageStyle = "color: 'green'"
  const title = '首页2'
  const handleScroll = (e) => {
    console.log(e)
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
