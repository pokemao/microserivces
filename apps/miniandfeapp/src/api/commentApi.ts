import { http } from "./http";
import { instance } from "./instances";

class CommentApi {
  async createComment() {
    // return await http.post(instance.postInstance, '/post', {}, {})
    http.test()
  }
}

export const commentApi = new CommentApi()
