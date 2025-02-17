type post = {
  id: string;
  title: string;
}

export default class PostsStorage {
  private posts: Record<string, post> = {};
  public addPost(post: post): void {
    this.posts[post.id] = post;
  }
  public getPosts(): typeof this.posts {
    return this.posts;
  }

}
