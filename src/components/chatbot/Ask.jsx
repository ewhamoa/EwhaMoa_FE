import { useState } from 'react';

import { AnythingElse } from './AnythingElse';

export function Ask({ message, posts, sent, onSelect }) {
  const [delayedRender, setDelayedRender] = useState(false);

  const [selectedValue, setSelectedValue] = useState(3);

  const handleSelectedValue = value => {
    setSelectedValue(value);
    onSelect(value);
  };

  setTimeout(() => {
    setDelayedRender(true);
  }, 2000);
  return (
    <>
      <div id="res-wrap">
        <div id="response">문의하기</div>
      </div>
      <img src="/moa.webp" id="profile" />
      {delayedRender ? <div id="moa">문의사항을 남겨주세요.</div> : <img src="/loading.gif" id="loading" />}
      {sent && (
        <>
          <div id="res-wrap">
            <div id="response">{message}</div>
          </div>
          <img src="/moa.webp" id="profile" />
          {delayedRender ? <div id="moa">접수되었습니다.</div> : <img src="/loading.gif" id="loading" />}
          <AnythingElse message={message} posts={posts} sent={sent} onSelect={handleSelectedValue} />
        </>
      )}
    </>
  );
}
