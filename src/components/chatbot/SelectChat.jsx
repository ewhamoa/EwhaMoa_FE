import { useState } from 'react';

export function SelectChat({ onSelect, greetings }) {
  const handleClick = click => {
    return () => {
      onSelect(click);
    };
  };

  return (
    <div>
      <div>
        <img src="/moa.webp" id="profile" />
      </div>

      <>
        <div>
          {greetings ? (
            <p id="moa">
              안녕하세요, 이화모아 챗봇 모아(MoA)입니다♡ 사이트 이용법, 동아리 추천, 기타 문의사항 등 궁금한 점을
              질문해주시면 안내해드리겠습니다!
            </p>
          ) : (
            <p id="moa">더 궁금하신 점이 있나요?</p>
          )}
        </div>
      </>

      <div id="moa-select">
        <div onClick={handleClick(2)} id="moa">
          <p>사이트 이용법</p>
        </div>
        <div onClick={handleClick(1)} id="moa">
          <p>문의하기</p>
        </div>
        <div onClick={handleClick(0)} id="moa">
          <p>동아리 추천받기</p>
        </div>
      </div>
    </div>
  );
}
