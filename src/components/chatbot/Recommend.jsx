import { PostItem } from '../posts';
import { useEffect, useState } from 'react';
import { SelectChat } from './SelectChat';
import * as linkify from 'linkifyjs';
import { AnythingElse } from './AnythingElse';

export function Recommend({ inputValue, sent, setSent, posts, onSelect, onMessage }) {
  const isChatbot = true;
  const [selectedValue, setSelectedValue] = useState(3);

  const handleSelectedValue = value => {
    setSelectedValue(value);
    onSelect(value);
  };
  console.log(posts);

  return (
    <>
      <div id="res-wrap">
        <div id="response">
          <p>비슷한 동아리 추천받기</p>
        </div>
      </div>

      <>
        <img src="/moa.webp" id="profile" />
        <div id="moa">
          <p>
            선호하는 동아리 및 학회의 이름을 띄어쓰기 없이 정확하게 입력해주세요. 입력하신 동아리 및 학회와 유사한 3개의
            단체를 추천해 드립니다.
          </p>
        </div>
      </>

      {sent && (
        <>
          <div id="res-wrap">
            <div id="response">{inputValue}</div>
          </div>

          <div>
            <img src="/moa.webp" id="profile" />
            <p id="moa">이런 공고는 어떠세요?</p>
            {posts === undefined ? (
              <div id="load">
                <img src="/loading.gif" />
              </div>
            ) : posts?.length !== 0 ? (
              posts?.map(({ groupName, isClub, postId, title }) => (
                <PostItem
                  key={postId}
                  postId={postId}
                  title={title}
                  groupName={groupName}
                  isClub={isClub}
                  isChatbot={true}
                />
              ))
            ) : (
              <h1 id="inner-wrap" style={{ color: 'darkgreen' }}>
                아직 게시글이 없습니다.
              </h1>
            )}
            <AnythingElse
              message={inputValue}
              posts={posts}
              sent={sent}
              setSent={setSent}
              onSelect={handleSelectedValue}
              onMessage={onMessage}
            />
          </div>
        </>
      )}
    </>
  );
}
