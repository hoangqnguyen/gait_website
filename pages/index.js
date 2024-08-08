import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Component1 from '@/components/Component1';
import Component2 from '@/components/Component2';
import Component3 from '@/components/Component3';
import Result1 from '@/components/Result1';

function Navbar(props) {
  return (
    <nav className="main_nav">
      <header className="logo"><a href="/">Gait Assessment</a></header>
      <div className="name">KIST님</div>
      <button className="history">히스토리</button>
      <button className="start" onClick={props.onStartClick}>시작하기</button>
    </nav>
  );
}

function Image() {
  return (
    <div>
      <img className="image_mountain" alt="mountain" src="/image_mountain.png" />
      <img className="image_cloud1" alt="cloud1" src="/image_cloud.png" />
      <img className="image_cloud2" alt="cloud2" src="/image_cloud.png" />
      <img className="image_cloud3" alt="cloud3" src="/image_cloud.png" />
      <img className="image_men" alt="men" src="/image_men.png" />
      <img className="image_women" alt="women" src="/image_women.png" />
    </div>
  );
}

function App(onTimeout) {
  const [showComponent1, setShowComponent1] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(false);
  const [showComponent3, setShowComponent3] = useState(false);
  const [showResult1, setShowResult1] = useState(false);

  const handleStartClick = () => {
    setShowComponent1(true);
    setFileUploaded(false); // 시작 시에는 파일 업로드 상태를 초기화
  };

  const handleFileUpload = () => {
    setFileUploaded(true);
    setShowComponent1(false); // 파일 업로드 후 Component1 닫기
  };

  const handleTimeout = () => {
    setShowComponent3(true); // Set state to show Component3
  };

  const handleShowResult = () => {
    setShowComponent3(false);
    setShowResult1(true);
  };

  return (
      <div className="App">
        <Navbar onStartClick={handleStartClick} />
        <div className="overlap">
          <p className="gait_assessment">
            영상 기반 <br />
            Gait Assessment System
          </p>
          <Image />
          <button className="main_start" onClick={handleStartClick}>시작하기</button>
        </div>
        {showComponent1 && !fileUploaded && <Component1 onFileUpload={handleFileUpload} />}
        {fileUploaded && !showComponent3 && !showResult1 && <Component2 onTimeout={handleTimeout} />}
        {/* {showComponent3 && !showResult1 && <Component3 onShowResult={handleShowResult} />} Pass handleShowResult to Component3 */}
        {/* {showResult1 && <Result1 />} Conditionally render Result1 */}
      </div>
  );
}

export default App;
