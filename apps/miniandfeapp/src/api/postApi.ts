import { http } from "./http";
import { instance } from "./instances";

class PostApi {
  async createPost(data: Record<string, unknown>, params?: Record<string, unknown>) {
    // return await http.post(instance.postInstance, '/post', {}, {})
    http.post(instance.postInstance, '/posts', data, params)
  }
}

export const postApi = new PostApi()
