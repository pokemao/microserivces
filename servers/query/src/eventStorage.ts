import {eventType} from "../../common/src/index.ts";

export default class EventStorage {
  private events: eventType[] = [];
  addEvent(event: eventType) {
    this.events.push(event);
  }
  // 获取所有没有处理的事件
  getUnhandledEvents(allEvnets: eventType[]): eventType[] {
    if(allEvnets.length === 0) return [];
    if(this.events.length === 0) return allEvnets;
    const lastHandledEvent = allEvnets[allEvnets.length - 1];
    const lastHandledEventIndex = this.events.findIndex((event) => event.id === lastHandledEvent!.id);
    if(lastHandledEventIndex === -1) return [];
    return this.events.slice(lastHandledEventIndex + 1);
  }
}
