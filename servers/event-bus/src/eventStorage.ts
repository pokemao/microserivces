import {eventType} from "../../common/src/index.ts";

export default class EventStorage {
  private events: eventType[] = [];
  addEvent(event: eventType) {
    this.events.push(event);
  }
  getEvents() {
    return this.events;
  }
}
