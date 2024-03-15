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
import { Chatbot } from '../chatbot';

export function ClubMain() {
  const isClub = true;
  const [posts, setPosts] = useState('');
  const [selectedTypeValue, setTypeSelectedValue] = useState('');
  const [selectedMajorValue, setMajorSelectedValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

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
        console.log(response.data);
        setPosts(response);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }

    fetchPosts();
  }, [posts?.postId, searchTerm]);

  const handleSearchClear = () => {
    setSearchTerm('');
  };

  function filterData() {
    if (posts !== undefined) {
      if (posts?.length !== 0) {
        const filteredData = posts.data?.filter(
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
            (!selectedSubValue || post?.topic === selectedSubValue) &&
            (!selectedWhoValue ||
              post?.grade === selectedWhoValue ||
              (selectedWhoValue === 2 && post?.grade === 1) ||
              (selectedWhoValue === 3 && (post?.grade === 1 || post?.grade === 2)) ||
              (selectedWhoValue === 4 && (post?.grade === 1 || post?.grade === 2 || post?.grade === 3))) &&
            (searchTerm !== ''
              ? post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.body.toLowerCase().includes(searchTerm.toLowerCase())
              : true),
        );

        return filteredData;
      }
    } else {
      return;
    }
  }

  return (
    <div id="wrap">
      <Header isClub={isClub} onSearch={setSearchTerm} searchClear={handleSearchClear} />
      <div id="header-wrap">
        <div className="align-row" id="filter">
          <TypeSort onSelect={handleTypeSelectedValue} onMajorSelect={handleMajorSelectedValue} />
          <WhoSort onSelect={handleWhoSelectedValue} />
          <SubjectSort onSelect={handleSubSelectedValue} />
        </div>
      </div>
      <Chatbot />
      <div id="item-wrap">
        <div id="items">
          {posts.data === undefined ? (
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
                  linkify.find(body) === undefined
                    ? null
                    : linkify.find(body)[0]?.href.includes('forms')
                      ? linkify.find(body)[0]?.href
                      : linkify.find(body)[1]?.href.includes('forms')
                        ? linkify.find(body)[1]?.href
                        : null
                }
                isClub={isClub}
                isChatbot={false}
              />
            ))
          ) : (
            <h1 id="inner-wrap" style={{ color: 'darkgreen' }}>
              아직 게시글이 없습니다.
            </h1>
          )}
        </div>
      </div>
      <div id="chatbot">
        <Chatbot />
      </div>
    </div>
  );
}
