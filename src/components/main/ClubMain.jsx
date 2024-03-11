import { Header } from './Header';
import { PostItem } from '../posts';
import { TypeSort, WhoSort } from '../sort';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { SubjectSort } from '../sort/SubjectSort';

export function ClubMain() {
  const isClub = true;
  const [posts, setPosts] = useState('');
  const [selectedTypeValue, setTypeSelectedValue] = useState('');

  const handleTypeSelectedValue = value => {
    setTypeSelectedValue(value);
  };

  const [selectedWhoValue, setWhoSelectedValue] = useState('');

  const handleWhoSelectedValue = value => {
    setWhoSelectedValue(value);
  };

  const [selectedSubValue, setSubSelectedValue] = useState('');

  const handleSubSelectedValue = value => {
    setSubSelectedValue(value);
  };

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get('/main/club');

        setPosts(response);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }

    fetchPosts();
  }, [posts?.postId]);

  function filterData() {
    if (posts.data !== undefined) {
      if (posts?.data.length !== 0) {
        const filteredData = posts?.data.filter(
          post =>
            (!selectedTypeValue || post?.where === selectedTypeValue) &&
            (!selectedSubValue || post?.what === selectedSubValue) &&
            (!selectedWhoValue || post?.who === selectedWhoValue),
        );

        return filteredData;
      }
    } else {
      return;
    }
  }

  return (
    <div>
      <Header />
      <TypeSort onSelect={handleTypeSelectedValue} />
      <WhoSort onSelect={handleWhoSelectedValue} />
      <SubjectSort onSelect={handleSubSelectedValue} />
      {posts.data === undefined ? (
        <div>loading...</div>
      ) : filterData().length !== 0 ? (
        filterData()?.map(({ postId, title, text, createdAt, due, link }) => (
          <PostItem
            key={postId}
            postId={postId}
            title={title}
            text={text}
            createdAt={createdAt}
            due={due}
            link={link}
            isClub={isClub}
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
