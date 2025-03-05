export type postId = string;
export type post = {
 id: postId;
 title: string;
}
export type commentId = string;
export type comment = {
 id: commentId;
 content: string;
}
export type query = {
 id: postId;
 title: string;
 comments: comment[];
}
