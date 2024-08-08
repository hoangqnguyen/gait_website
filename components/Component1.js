import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';

function Example({ setShowFolder }) {
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (showVideo && videoRef.current) {
      videoRef.current.play();
    }
  }, [showVideo]);

  const handleVideoShow = () => {
    setShowVideo(true);
    setShowFolder(false);
  };

  const handleVideoControl = (action) => {
    if (typeof window === 'undefined') return;

    const video = videoRef.current;
    if (!video) return;

    switch (action) {
      case 'play':
        video.play();
        break;
      case 'pause':
        video.pause();
        break;
      case 'close':
        video.pause();
        setShowVideo(false);
        setShowFolder(true);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      {showVideo && (
        <div className="video_display">
          <video ref={videoRef} width="480" height="360" controls>
            <source src="./video_X.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="button_container">
            <button onClick={() => handleVideoControl('play')}>재생</button>
            <button onClick={() => handleVideoControl('pause')}>일시정지</button>
            <button onClick={() => handleVideoControl('close')}>닫기</button>
          </div>
        </div>
      )}
      {!showVideo && <button className="example_word" onClick={handleVideoShow}>예시영상 확인하기</button>}
    </div>
  );
}

function Component1({ onFileUpload }) {
  const [showFolder, setShowFolder] = useState(true);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [uploadedFilePath, setUploadedFilePath] = useState('');
  const [jsonData, setJsonData] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('video')) {
      setFile(selectedFile);
      setMessage('');
      await onSubmit(selectedFile);
    } else {
      alert("비디오 파일을 업로드해주세요.");
    }
  };

  const openFileInput = () => {
    if (typeof window !== 'undefined') {
      fileInputRef.current.click();
    }
  };

  const onSubmit = async (selectedFile) => {
    const formData = new FormData();
    formData.append('video', selectedFile);

    try {
      const res = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('File uploaded successfully');
      setUploadedFilePath(res.data.filePath);
      setJsonData(res.data);
      console.log('Video processing result:', res.data); // Log the result to the console
      onFileUpload();
      setShowFolder(false);
    } catch (err) {
      setMessage('File upload failed');
    }
  };

  return (
    <div className="div-wrapper">
      <Example setShowFolder={setShowFolder} />
      {showFolder && (
        <>
          <div className="overlap-group1">
            <img
              className="image_folder"
              alt="folder"
              src="/folder.png"
              onClick={openFileInput}
            />
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept="video/*"
              onChange={handleFileChange}
            />
          </div>
          <div className="caution">
            분석하실 영상은 발을 포함한 전신이 나와야하며 <br />발을 땅에 끌면 정확한 검사 결과가 나오지 않을 수 있습니다.
          </div>
          {message && <p>{message}</p>}
          {uploadedFilePath && (
            <video width="400" controls>
              <source src={uploadedFilePath} type="video/mp4" />
              Your browser does not support HTML video.
            </video>
          )}
          {jsonData && (
            <pre>{JSON.stringify(jsonData, null, 2)}</pre>
          )}
        </>
      )}
    </div>
  );
}

export default Component1;
