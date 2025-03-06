export type postId = string;
export type post = {
 id: postId;
 title: string;
}
export enum commentStatus {
 pending = 'pending',
 approved = 'approved',
 rejected = 'rejected',
}
export type postCreateEventData = post;
export type commentId = string;
export type comment = {
 id: commentId;
 content: string;
 status: commentStatus;
}
export type commentCreateEventData = {
 postId: postId;
 comment: comment;
}
export type query = {
 id: postId;
 title: string;
 comments: comment[];
}
