import { useState, useEffect } from 'react';
import { PostItem } from '../posts';
import axios from 'axios';

export function MyPosts() {
  const [posts, setPosts] = useState('');

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get('/user/posts');
        console.log(response.data);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }
    fetchPosts();
  }, [posts.postId]);

  return (
    <div id="item-wrap">
      <div id="items">
        {posts === undefined ? (
          <div id="load">
            <img src="/loading.gif" />
          </div>
        ) : posts.length !== 0 ? (
          posts?.map(({ postId, title, body, createdAt, due, club, imageLink }) => (
            <PostItem
              key={postId}
              postId={postId}
              title={title}
              body={body}
              createdAt={createdAt}
              due={due}
              link={'disable'}
              isClub={club}
              isChatbot={false}
              imageLink={imageLink}
            />
          ))
        ) : (
          <img src="/loading.gif" />
        )}
      </div>
    </div>
  );
}
