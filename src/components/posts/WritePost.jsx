import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { TypeSort, WhoWriteSort, TopicSort, SubjectSort } from '../sort';
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

  const [isClub, setSelectedisClub] = useState(true);

  const handleisClubClick = clickedType => {
    setSelectedisClub(clickedType);
  };

  const [inputs, setInputs] = useState({
    Club: isClub,
    groupName: '',
    title: '',
    body: '',
    due: '',
    affiliation_type: selectedTypeValue,
    affiliation_name: selectedMajorValue,
    topic: selectedSubValue,
    grade: selectedWhoValue,
    imageLink: image,
  });

  const { groupName, title, body, due } = inputs;
  const [file, setFile] = useState(null);

  const handleFileChange = async e => {
    e.preventDefault();
    const selectedFile = e.target.files[0];
    setSelectedFileName(selectedFile.name); // 선택된 파일명 설정
    const formData = new FormData();
    formData.append('file', selectedFile); // e.target.files[0]을 추가

    try {
      const response = await axios.post('/upload/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      setImage(response.data);
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

    const Club = Boolean(isClub);

    try {
      const response = await axios.post('/main/post', {
        Club,
        groupName,
        title,
        body,
        due,
        affiliation_type: selectedTypeValue,
        affiliation_name: selectedMajorValue,
        topic: selectedSubValue,
        grade: selectedWhoValue,
        imageLink: image,
      });

      setInputs({
        Club: '',
        groupName: '',
        title: '',
        body: '',
        due: '',
        affiliation_type: '',
        affiliation_name: '',
        topic: '',
        grade: '',
        imageLink: '',
      });

      window.location.href = '/';
    } catch (error) {
      console.error('Error creating post:', error);
      console.log(inputs.due.type);
    }
  };

  const [dueVisible, setDueVisible] = useState(false);
  const inputRef = useRef(null);

  const handleDropdownClick = () => {
    // 입력 필드를 표시합니다.
    setDueVisible(true);
    // 입력 필드를 포커스합니다.
    inputRef.current.click();
  };

  const fileInputRef = useRef(null);

  const handleUploadButtonClick = e => {
    e.preventDefault();
    fileInputRef.current.click(); // 파일 선택 창 열기
  };

  const [selectedFileName, setSelectedFileName] = useState('');

  return (
    <>
      <Header />
      <div id="wrap">
        <div className="write-post">
          <div id="write">
            <div id="write-intro">
              <img src="write-edit.png" />
              <p>홍보글 작성하기</p>
            </div>
            <form onSubmit={handleSubmit} id="recruit-form">
              <div className="align-row">
                <div id="flex-col">
                  <h3>구분</h3>
                  <div id="select-list">
                    <div
                      onClick={() => handleisClubClick(true)}
                      id="select"
                      style={isClub ? { border: '#16a085 2px solid' } : { border: '#d9d9d9 1px solid' }}>
                      동아리
                    </div>
                    <div
                      onClick={() => handleisClubClick(false)}
                      id="select"
                      style={!isClub ? { border: '#16a085 2px solid' } : { border: '#d9d9d9 1px solid' }}>
                      학회
                    </div>
                  </div>
                </div>
                <div id="flex-col">
                  <h3 id="g-n">동아리명/학회명</h3>
                  <input
                    id="group-name"
                    type="text"
                    name="groupName"
                    value={groupName}
                    onChange={handleInputChange}
                    placeholder="동아리/학회명을 입력하세요..."
                  />
                </div>
              </div>

              <div className="align-row" id="filter">
                <div id="flex-col">
                  <div>
                    <TypeSort onSelect={handleTypeSelectedValue} onMajorSelect={handleMajorSelectedValue} />
                  </div>
                </div>
                <div id="flex-col">
                  <WhoWriteSort onSelect={handleWhoSelectedValue} />
                </div>

                <div id="flex-col">
                  {isClub === true ? <SubjectSort onSelect={handleSubSelectedValue} /> : null}
                  {isClub === false ? <TopicSort onSelect={handleSubSelectedValue} /> : null}
                </div>

                <div id="flex-col">
                  {!dueVisible && (
                    <div className="align-row" id="dropdown" onClick={handleDropdownClick}>
                      <p>모집 기한</p>
                      <img src="/arrow.svg" />
                    </div>
                  )}

                  <input
                    ref={inputRef}
                    id="write-due"
                    type="date"
                    name="due"
                    value={due}
                    onChange={handleInputChange}
                    style={{ display: dueVisible ? 'block' : 'none' }}
                  />
                </div>
              </div>

              <div id="flex-row">
                <div id="flex-col">
                  <h3>제목</h3>
                  <input id="write-title" type="text" name="title" value={title} onChange={handleInputChange} />
                </div>

                <div id="flex-col">
                  <h3>내용</h3>
                  <textarea id="write-content" type="text" name="body" value={body} onChange={handleInputChange} />
                </div>
              </div>
              <div id="flex-row"></div>
              <div id="margin-top">
                <div className="align-row" id="image-up">
                  <h3>대표 이미지 업로드</h3> <h4>(512 x 512 권장, 10MB까지 가능)</h4>
                </div>
                <div className="align-row" id="upload-file">
                  <input type="file" onChange={handleFileChange} ref={fileInputRef} style={{ display: 'none' }} />

                  <button onClick={handleUploadButtonClick} id="select-file">
                    <img src="/upload.svg" />
                    파일 선택
                  </button>
                  {selectedFileName && <p id="file-name">{selectedFileName}</p>}
                </div>
              </div>
              <div id="write-bottom">
                <button type="submit" id="write-submit">
                  작성하기
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
