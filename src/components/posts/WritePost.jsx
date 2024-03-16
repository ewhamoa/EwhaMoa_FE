import { useState, useEffect } from 'react';
import axios from 'axios';
import { TypeSort, WhoSort, TopicSort, SubjectSort } from '../sort';
import { Header } from '../main';

export function WritePost() {
  const [image, setImage] = useState('');

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

  const [inputs, setInputs] = useState({
    Club: '',
    groupName: '',
    title: '',
    body: '',
    due: '',
    affiliationType: selectedTypeValue,
    affiliationName: selectedMajorValue,
    topic: selectedSubValue,
    grade: selectedWhoValue,
    imageLink: image,
  });

  const { Club, groupName, title, body, due, group, affiliationType, affiliationName, topic, grade, imageLink } =
    inputs;
  const [file, setFile] = useState(null);
  const handleFileChange = e => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async e => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/upload/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      setImage(response.data.imageLink);
      // 파일 업로드 성공 처리
    } catch (error) {
      console.error('파일 업로드에 실패했습니다:', error);
      // 파일 업로드 실패 처리
    }
  };

  const handleInputChange = e => {
    const { name, value } = e.target;

    setInputs(prevInputs => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const isClub = Boolean(Club);

    try {
      const response = await axios.post('/main/post', {
        isClub,
        groupName,
        title,
        body,
        due,
        group,
        affiliationType,
        affiliationName,
        topic,
        grade,
        imageLink,
      });

      setInputs({
        Club: '',
        groupName: '',
        title: '',
        body: '',
        due: '',
        affiliationType: '',
        affiliationName: '',
        topic: '',
        grade: '',
        imageLink: '',
      });

      window.location.href = '/';
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <>
      <Header />
      <div id="wrap">
        <div id="inner-wrap" className="write-post">
          <div id="write">
            <h3>홍보글 작성</h3>
            <form onSubmit={handleSubmit} id="recruit-form">
              <div id="flex-row">
                <div id="flex-col">
                  <label>동아리</label>
                  <div>
                    <input type="radio" name="Club" value={true} onChange={handleInputChange} />
                  </div>
                  <label>학회</label>
                  <div>
                    <input type="radio" name="Club" value={false} onChange={handleInputChange} />
                  </div>
                </div>
                <div id="flex-col">
                  <label>소속 선택</label>
                  <div>
                    <TypeSort onSelect={handleTypeSelectedValue} onMajorSelect={handleMajorSelectedValue} />
                  </div>
                </div>
              </div>
              <div id="flex-row">
                <div id="flex-col">
                  <label>모집 대상 선택</label>
                  <WhoSort onSelect={handleWhoSelectedValue} />
                </div>

                <div id="flex-col">
                  <label id="green">주제 선택</label>

                  {inputs.Club === 'true' ? <SubjectSort onSelect={handleSubSelectedValue} /> : null}
                  {inputs.Club === 'false' ? <TopicSort onSelect={handleSubSelectedValue} /> : null}
                </div>
              </div>
              <div id="flex-row">
                <div id="flex-col">
                  <label>제목</label>
                  <input id="id" type="text" name="title" value={title} onChange={handleInputChange} />
                </div>

                <div id="flex-col">
                  <label id="green">내용</label>
                  <textarea id="write-content" type="text" name="body" value={body} onChange={handleInputChange} />
                </div>
              </div>
              <div id="flex-row">
                <div id="flex-col">
                  <label>모집 기한</label>
                  <input id="id" type="date" name="due" value={due} onChange={handleInputChange} />
                </div>
              </div>
              <div id="margin-top">
                <h3>이미지 첨부파일</h3>
                <input type="file" onChange={handleFileChange} />
                <button onClick={handleUpload}>업로드</button>
              </div>
              <div id="write-bottom">
                <button type="submit">완료</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
