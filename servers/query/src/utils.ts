import axios from "axios";
import { commentCreateEventData, eventType, postCreateEventData } from "../../common/src/type.ts";
import EventStorage from "./eventStorage.ts";
import QueryStorage from "./queryStorage.ts";

export const handleEvent = (query: QueryStorage, handledEvents: EventStorage, event: eventType) => {
  const {type, data} = event;
  if (type === 'PostCreated') {
    query.addPost(data as postCreateEventData);
  }
  if (type === 'CommentCreated') {
    const {postId, comment} = data as commentCreateEventData;
    query.addComment(postId, comment);
  }
  if (type === 'CommentUpdated') {
    const { postId, comment } = data as commentCreateEventData;
    query.updateComment(postId, comment);
  }
  handledEvents.addEvent(event);
}

// 同步事件队列
export const syncEvents = (query: QueryStorage, handledEvents: EventStorage, timeout: number = 2000) => {
  setTimeout(async () => {
    try {
      // 获取event服务中所有收到过的事件
      const allEvnets: eventType[] = await axios.get(process.env.MICRO_APP_EVENT_BUS_URL! + ':' + process.env.MICRO_APP_EVENT_BUS_PORT! + '/events')
      // 把没有执行过的都执行一遍
      handledEvents.getUnhandledEvents(allEvnets).forEach((event) => {
        handleEvent(query, handledEvents, event);
      })
      console.log('同步事件队列成功');
    }catch (e) {
      syncEvents(query, handledEvents, timeout);
    }
  })
}
