import { AnythingElse } from './AnythingElse';

export function Ask({ message, posts, sent }) {
  return (
    <>
      <div id="res-wrap">
        <div id="response">문의하기</div>
      </div>
      <div id="moa">문의사항을 남겨주세요.</div>
      {sent && (
        <>
          <div id="res-wrap">
            <div id="response">{message}</div>
          </div>

          <div id="moa">접수되었습니다.</div>
          <AnythingElse message={message} posts={posts} sent={sent} />
        </>
      )}
    </>
  );
}
