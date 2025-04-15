import { http } from "./http";
import { instance } from "./instances";

class PostApi {
  async createPost(data: Record<string, unknown>, params?: Record<string, unknown>) {
    // return await http.post(instance.postInstance, '/post', {}, {})
    return await http.post(instance.postInstance, '/posts', data, params)
  }
  async getPosts(params?: Record<string, unknown>) {
    return await http.get(instance.postInstance, '/posts', params)
  }
}

export const postApi = new PostApi()
