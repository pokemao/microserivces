import axios from "axios";
import { commentCreateEventData, eventType, postCreateEventData } from "../../common/src/type.ts";
import EventStorage from "./eventStorage.ts";
import QueryStorage from "./queryStorage.ts";
import esbuildPluginEnv from "@microservices/esbuild-plugin-env";
import { to } from "../../common/src/common.ts";

let count = 0;

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
    console.log('第' + ++count + '次尝试同步事件队列');
    const event_bus_path = esbuildPluginEnv.MICRO_APP_EVENT_BUS_PROTOCOL! + esbuildPluginEnv.MICRO_APP_EVENT_BUS_INNER_HOST! + esbuildPluginEnv.MICRO_APP_EVENT_BUS_PORT! + '/events'
    // 获取event服务中所有收到过的事件
    const [err, res] = await to(axios.get(event_bus_path))
    if (err) {
      console.log('获取事件失败', JSON.stringify(err, null, 2));
      syncEvents(query, handledEvents, timeout);
      return;
    }
    // 判断响应是否成功
    if (res.status !== 200 && res.status!== 201) {
      console.log('获取事件失败', JSON.stringify(res.data, null, 2));
      process.exit(1);
    }
    const allEvnets: eventType[] = res.data;
    // 把没有执行过的都执行一遍
    handledEvents.getUnhandledEvents(allEvnets).forEach((event) => {
      handleEvent(query, handledEvents, event);
    })
    console.log('同步事件队列成功');
  }, timeout)
}
