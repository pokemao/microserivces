import { comment, commentStatus, postId } from "../../common/src/index.ts";

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
  public changeCommentStatus(postId: postId, commentId: string, status: commentStatus): comment | never {
    console.log(postId, commentId, status);
    console.log(this.comments);

    const comments = this.comments[postId];
    if (!comments) {
      throw new Error("Post not found");
    }
    const comment = comments.find((comment) => comment.id === commentId);
    if (!comment) {
      throw new Error("Comment not found");
    }
    comment.status = status;
    return comment;
  }
}
