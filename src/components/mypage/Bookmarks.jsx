import { useEffect, useState } from 'react';
import { PostItem } from '../posts';
import axios from 'axios';

export function Bookmarks() {
  const [posts, setPosts] = useState('');

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get('/user/bookmark');
        console.log(response.data);
        setPosts(response);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }

    fetchPosts();
  }, [posts?.postId]);
  return (
    <div>
      {posts === undefined ? (
        <div id="load">
          <img src="/loading.gif" />
        </div>
      ) : posts?.length !== 0 ? (
        posts?.map(({ groupName, isClub, postId, title, imageLink }) => (
          <PostItem
            key={postId}
            postId={postId}
            title={title}
            groupName={groupName}
            isClub={isClub}
            isChatbot={true}
            imageLink={imageLink}
          />
        ))
      ) : (
        <h1 id="inner-wrap" style={{ color: 'darkgreen' }}>
          아직 게시글이 없습니다.
        </h1>
      )}
    </div>
  );
}
