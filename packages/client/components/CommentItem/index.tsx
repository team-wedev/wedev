import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CircularProgress } from '@material-ui/core';

import * as S from './style';
import CommentForm from '../CommentForm';
import { FavoriteSVG } from '../../svgs';
import { endpoint } from '../../constants';
import { format } from '../../libs/timeago';
import { useReplies } from './hook/use-replies';
import { useUser } from '../UserProvider/hooks';
import { useCommentLike } from './hook/use-comment-like';
import { useCommentEdit } from './hook/use-comment-edit';
import { useCommentDelete } from './hook/use-comment-delete';

const CommentItem = ({
  reply,
  id,
  content,
  likedUsersCount,
  childrenCount,
  user,
  createdAt,
  updatedAt,
  likedByUser,
}) => {
  const router = useRouter();
  const { videoId } = router.query;

  const loggedInUser = useUser();

  let myComment = false;
  if (loggedInUser) {
    myComment = user.id === loggedInUser.userId;
  }

  const commentEditState = useCommentEdit(videoId, id, content);
  const commentDeleteState = useCommentDelete(videoId, id);
  const repliesState = useReplies(videoId, id);

  const { likesCount, liked, onLike } = useCommentLike(
    videoId,
    id,
    likedUsersCount,
    likedByUser,
    loggedInUser,
    router,
  );

  const loader = (
    <S.Loader>
      <CircularProgress thickness={4} />
    </S.Loader>
  );

  if (commentDeleteState.deleted) {
    return null;
  }

  return (
    <S.CommentItem reply={reply}>
      <Link
        href={`${endpoint.users}/[userId]`}
        as={`${endpoint.users}/${user.id}`}
      >
        <S.Avatar reply={reply}>
          <img src={user.avatar} />
        </S.Avatar>
      </Link>
      <S.Content>
        {commentEditState.edit ? (
          <CommentForm
            style={{
              marginBottom: '0rem',
            }}
            rows={1}
            reply
            avatar={false}
            loading={commentEditState.formLoading}
            value={commentEditState.formValue}
            submitMessage="수정"
            onChange={commentEditState.onFormChange}
            onFocus={() => null}
            onBlur={() => null}
            onCancel={() => commentEditState.onEdit()}
            onSubmit={commentEditState.onFormSubmit}
          />
        ) : (
          <>
            <S.User>
              <Link
                href={`${endpoint.users}/[userId]`}
                as={`${endpoint.users}/${user.id}`}
              >
                <span>{user.username}</span>
              </Link>
              <span className="dates-ago">{format(createdAt, 'ko')}</span>
            </S.User>
            <S.Description>
              {commentEditState.editedComment || content}
            </S.Description>

            <S.Actions>
              <S.Like type="button" active={liked} onClick={onLike}>
                <FavoriteSVG />
                <span>좋아요 {likesCount > 0 && `${likesCount}개`}</span>
              </S.Like>

              {!reply && (
                <>
                  <span className="dot">・</span>
                  <button onClick={repliesState.onFormOpen}>댓글 달기</button>
                </>
              )}

              {myComment && (
                <>
                  <span className="dot">・</span>
                  <button
                    onClick={() => {
                      repliesState.onFormCancel();
                      commentEditState.onEdit();
                    }}
                  >
                    수정
                  </button>
                  <span className="dot">・</span>
                  <button onClick={commentDeleteState.onDelete}>삭제</button>
                </>
              )}
            </S.Actions>
          </>
        )}

        {repliesState.formOpen && (
          <S.StyledCommentForm
            reply
            rows={1}
            loading={repliesState.formLoading}
            value={repliesState.formValue}
            onChange={repliesState.onFormChange}
            onCancel={repliesState.onFormCancel}
            onSubmit={repliesState.onFormSubmit}
          />
        )}

        {childrenCount > 0 && !repliesState.open && (
          <S.MoreRepliesButton>
            <button type="button" onClick={repliesState.onOpen}>
              <S.StyledSubdirectoryArrowRightSVG />
              <span>댓글 {childrenCount}개 더 보기</span>
            </button>
          </S.MoreRepliesButton>
        )}

        {repliesState.open && (
          <S.Replies>
            {repliesState.submittedReplies.map(replyComment => (
              <CommentItem key={replyComment.id} reply {...replyComment} />
            ))}
            {repliesState.replies.map(replyComment => {
              return (
                <CommentItem key={replyComment.id} reply {...replyComment} />
              );
            })}
            {repliesState.loading
              ? loader
              : repliesState.hasMore && (
                  <S.LoadMoreRepliesButton>
                    <button type="button" onClick={repliesState.onNext}>
                      <S.StyledArrowDropDownSVG />
                      <span>댓글 더 불러오기</span>
                    </button>
                  </S.LoadMoreRepliesButton>
                )}
          </S.Replies>
        )}
      </S.Content>
    </S.CommentItem>
  );
};

export default CommentItem;
