import { post, postId } from '../../common/src/index.ts'

export default class PostsStorage {
  private posts: Record<postId, post> = {};
  public addPost(post: post): void {
    this.posts[post.id] = post;
  }
  public getPosts(): typeof this.posts {
    return this.posts;
  }
}
