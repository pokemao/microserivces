import { comment, postId } from "../../common/src/index.ts";

export default class CommentsStorage {
  private comments: Record<postId, comment[]> = {};
  public addComment(postId: postId, comment: comment): void {
    if (!this.comments[postId]) {
      this.comments[postId] = [];
    }
    this.comments[postId].push(comment);
  }
  public getCommentsByPostId(postId: postId): comment[] {
    return this.comments[postId] || [];
  }
}
