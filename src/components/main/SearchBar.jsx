import { useState, useEffect } from 'react';
import axios from 'axios';
import { PostItem } from '../posts';
import * as linkify from 'linkifyjs';

export function SearchBar() {
  const [clubPosts, setClubPosts] = useState([]);
  const [confPosts, setConfPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // 검색어 입력 핸들러
  const handleSearchInputChange = event => {
    setSearchTerm(event.target.value);
  };

  // 검색된 게시물 필터링
  const filteredClubPosts = clubPosts.filter(post => {
    // 제목이나 내용에 검색어가 포함되어 있는지 확인
    return (
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.body.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const filteredConfPosts = confPosts.filter(post => {
    // 제목이나 내용에 검색어가 포함되어 있는지 확인
    return (
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.body.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div>
      <input type="text" placeholder="검색어를 입력하세요..." value={searchTerm} onChange={handleSearchInputChange} />
      {/*filteredClubPosts.length === 0 ? (
        <div>검색 결과가 없습니다.</div>
      ) : (
        filteredClubPosts.map(({ postId, title, body, createdAt, due }) => (
          <PostItem
            key={postId}
            postId={postId}
            title={title}
            body={body}
            createdAt={createdAt}
            due={due}
            link={
              linkify.find(body)[0].href.includes('forms')
                ? linkify.find(body)[0].href
                : linkify.find(body)[1].href.includes('forms')
                  ? linkify.find(body)[1].href
                  : null
            }
            isClub={true}
          />
        )) ||
        filteredConfPosts.map(({ postId, title, body, createdAt, due }) => (
          <PostItem
            key={postId}
            postId={postId}
            title={title}
            body={body}
            createdAt={createdAt}
            due={due}
            link={
              linkify.find(body)[0].href.includes('forms')
                ? linkify.find(body)[0].href
                : linkify.find(body)[1].href.includes('forms')
                  ? linkify.find(body)[1].href
                  : null
            }
            isClub={false}
          />
        ))
        )*/}
    </div>
  );
}
