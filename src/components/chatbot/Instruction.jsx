import { SelectChat } from './SelectChat';
import { Recommend } from './Recommend';
import { Ask } from './Ask';
import { Chatbot } from './Chatbot';
import { useState } from 'react';
import { AnythingElse } from './AnythingElse';

export function Instruction({ message, posts, sent }) {
  const [selectedValue, setSelectedValue] = useState(-1);

  const handleSelectedValue = value => {
    setSelectedValue(value);
  };
  return (
    <>
      <div id="response">
        <p>사이트 이용법</p>
      </div>
      <div id="moa">
        <p>“이화모아”는 이화여자대학교 학생들이 교내외 동아리 및 학회를 보다 편리하게 찾아볼 수 있는 사이트입니다!</p>

        <p>1) 교내 이메일 계정으로 회원가입 및 로그인을 해주세요.</p>
        <p>2) 동아리와 학회 중 검색하고자 하는 단체를 선택해주세요.</p>
        <p>3) 소속, 모집대상, 단과대 별로 해당하는 영역을 선택해주세요.</p>
        <p>4) 특정 키워드를 검색하고 싶은 경우 검색창을 이용해주세요.</p>
        <p>5) 원하는 단체의 공고를 클릭하여 팝업창을 통해 자세한 내용을 확인하세요.</p>
        <p>
          6) “지원하기” 버튼을 클릭하면 해당 단체 측에서 제공한 지원 서류 및 신청서를 제출할 수 있는 사이트로
          연결됩니다.
        </p>
        <p>7) 동아리를 추천받고 싶거나 기타 문의사항이 있는 경우 오른쪽 아래의 챗봇(MoA) 아이콘을 활용해주세요.</p>
      </div>
      <AnythingElse message={message} posts={posts} sent={sent} />
    </>
  );
}
