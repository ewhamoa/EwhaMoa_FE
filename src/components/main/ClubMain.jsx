import { Header } from './Header';
import { PostItem } from '../posts';
import { TypeSort, WhoSort } from '../sort';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { SubjectSort } from '../sort/SubjectSort';
import './main.css';
import * as linkify from 'linkifyjs';
import linkifyHtml from 'linkify-html';
import { dummy } from './dummyData';

export function ClubMain() {
  const isClub = true;
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
        const response = await axios.get('/main/club');

        setPosts(response);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }

    fetchPosts();
  }, [posts?.postId]);

  function filterData() {
    if (dummy !== undefined) {
      if (dummy?.length !== 0) {
        const filteredData = dummy?.filter(
          post =>
            (!selectedTypeValue ||
              (selectedTypeValue === 0 &&
                (post?.affiliationType === 1 ||
                  post?.affiliationType === 2 ||
                  post?.affiliationType === 3 ||
                  post?.affiliationType === 4)) ||
              (post?.affiliationType === 5 && (selectedTypeValue === 3 || selectedTypeValue === 4)) ||
              post?.affiliationType === selectedTypeValue) &&
            (!selectedMajorValue || post?.affiliationName === selectedMajorValue) &&
            (!selectedSubValue || post?.affiliationName === selectedSubValue) &&
            (!selectedWhoValue ||
              post?.grade === selectedWhoValue ||
              (post?.grade === 2 && selectedWhoValue === 1) ||
              (post?.grade === 3 && (selectedWhoValue === 1 || selectedWhoValue === 2)) ||
              (post?.grade === 4 && (selectedWhoValue === 1 || selectedWhoValue === 2 || selectedWhoValue === 3))),
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
      <div id="header-wrap">
        <div className="align-row" id="filter">
          <TypeSort onSelect={handleTypeSelectedValue} onMajorSelect={handleMajorSelectedValue} />
          <WhoSort onSelect={handleWhoSelectedValue} />
          <SubjectSort onSelect={handleSubSelectedValue} />
        </div>
      </div>
      {dummy === undefined ? (
        <div>loading...</div>
      ) : filterData().length !== 0 ? (
        filterData()?.map(({ postId, title, body, createdAt, due }) => (
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
