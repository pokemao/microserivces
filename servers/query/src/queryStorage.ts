import { comment, post, postId, query } from '../../common/src/index.ts'

export default class queryStorage {
  private query: Record<postId, query> = {};
  public addPost(post: post): void {
    this.query[post.id] = {
      ...post,
      comments: [],
    };
  }
  public addComment(postId: postId, comment: comment): void | never {
    if (!this.query[postId]) {
      throw new Error('Post not found');
    }
    this.query[postId].comments?.push(comment);
  }
  public getAllQuery(): typeof this.query {
    return this.query;
  }
  public updateComment(postId: postId, comment: comment): void | never {
    if (!this.query[postId]) {
      throw new Error('Post not found');
    }
    const comments = this.query[postId].comments;
    if (!comments) {
      throw new Error('Comments not found');
    }
    const commentIndex = comments.findIndex((comment) => comment.id === comment.id);
    if (commentIndex === -1) {
      throw new Error('Comment not found');
    }
    comments[commentIndex] = comment;
  }
}
