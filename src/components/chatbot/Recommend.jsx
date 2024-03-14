import { PostItem } from '../posts';
import { useEffect, useState } from 'react';
import { SelectChat } from './SelectChat';
import * as linkify from 'linkifyjs';
import { AnythingElse } from './AnythingElse';

export function Recommend({ inputValue, sent, posts }) {
  const [selectedValue, setSelectedValue] = useState(3);

  const handleSelectedValue = value => {
    setSelectedValue(value);
  };
  return (
    <>
      <div id="response">
        <p>비슷한 동아리 추천받기</p>
      </div>
      <div id="moa">
        <p>
          선호하는 동아리 및 학회의 이름을 띄어쓰기 없이 정확하게 입력해주세요. 입력하신 동아리 및 학회와 유사한 3개의
          단체를 추천해 드립니다.
        </p>
      </div>
      {sent && (
        <>
          <div id="response">{inputValue}</div>
          <div id="moa">
            <p>이런 공고는 어떠세요?</p>
            {posts.data === undefined ? (
              <div>loading...</div>
            ) : posts?.length !== 0 ? (
              posts?.map(({ postId, title, body, createdAt, due, isClub }) => (
                <PostItem
                  key={postId}
                  postId={postId}
                  title={title}
                  body={body}
                  createdAt={createdAt}
                  due={due}
                  link={
                    linkify.find(body) === undefined
                      ? null
                      : linkify.find(body)[0]?.href.includes('forms')
                        ? linkify.find(body)[0]?.href
                        : linkify.find(body)[1]?.href.includes('forms')
                          ? linkify.find(body)[1]?.href
                          : null
                  }
                  isClub={isClub}
                />
              ))
            ) : (
              <h1 id="inner-wrap" style={{ color: 'darkgreen' }}>
                아직 게시글이 없습니다.
              </h1>
            )}
          </div>
          <AnythingElse message={inputValue} posts={posts} sent={sent} />
        </>
      )}
    </>
  );
}
