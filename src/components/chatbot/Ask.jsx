import { useState } from 'react';

import { AnythingElse } from './AnythingElse';

export function Ask({ message, posts, sent, onSelect, onMessage, setSent }) {
  const [selectedValue, setSelectedValue] = useState(3);

  const handleSelectedValue = value => {
    setSelectedValue(value);
    onSelect(value);
  };

  return (
    <>
      <div id="res-wrap">
        <div id="response">문의하기</div>
      </div>
      <img src="/moa.webp" id="profile" />

      <div id="moa">문의사항을 남겨주세요.</div>
      {sent && (
        <>
          <div id="res-wrap">
            <div id="response">{message}</div>
          </div>
          <img src="/moa.webp" id="profile" />
          <div id="moa">접수되었습니다.</div>
          <AnythingElse
            message={message}
            posts={posts}
            sent={sent}
            onSelect={handleSelectedValue}
            onMessage={onMessage}
            setSent={setSent}
          />
        </>
      )}
    </>
  );
}
