import { http } from "./http";
import { instance } from "./instances";

class CommentApi {
  async createComment(postId: string, data: Record<string, unknown>, params?: Record<string, unknown>) {
    return await http.post(instance.commentInstance, `/posts/${postId}/comments`, data, params)
  }
  async getComments(postId: string, params?: Record<string, unknown>) {
    return await http.get(instance.commentInstance, `/posts/${postId}/comments`, params)
  }
}

export const commentApi = new CommentApi()
