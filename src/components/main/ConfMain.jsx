import { Header } from './Header';
import { PostItem } from '../posts';
import { TypeSort, WhoSort } from '../sort';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { TopicSort } from '../sort';
import './main.css';

import * as linkify from 'linkifyjs';
import linkifyHtml from 'linkify-html';

export function ConfMain() {
  const isClub = false;
  const [posts, setPosts] = useState('');
  const [selectedTypeValue, setTypeSelectedValue] = useState('');
  const [selectedMajorValue, setMajorSelectedValue] = useState('');

  const handleTypeSelectedValue = value => {
    setTypeSelectedValue(value);
  };

  const handleMajorSelectedValue = value => {
    setMajorSelectedValue(value);
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
        const response = await axios.get('/main/conference');

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
            (!selectedTypeValue ||
              (post?.where === 5 && (selectedTypeValue === 3 || selectedTypeValue === 4)) ||
              post?.where === selectedTypeValue) &&
            (!selectedMajorValue || post?.affiliationId === selectedWhoValue) &&
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
    <div id="wrap">
      <Header isClub={isClub} />
      <div className="align-row" id="space-between">
        <TypeSort onSelect={handleTypeSelectedValue} onMajorSelect={handleMajorSelectedValue} />
        <WhoSort onSelect={handleWhoSelectedValue} />
        <TopicSort onSelect={handleSubSelectedValue} />
      </div>
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
            link={
              linkify.find(text)[0].href.includes('forms')
                ? linkify.find(text)[0].href
                : linkify.find(text)[1].href.includes('forms')
                  ? linkify.find(text)[1].href
                  : null
            }
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
