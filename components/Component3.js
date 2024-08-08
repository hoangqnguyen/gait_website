import React from "react";
import { Link } from 'react-router-dom';
// import "@/styles/Component3.css";

function Component3({ onShowResult }) {
  return (
    <div className="div-wrapper">
      <div className="overlap-group3">
        <button className="overlap" onClick={onShowResult}>
          <Link to="/Result1" className="text-wrapper">결과보기</Link>
        </button>
        <progress className="progress_bar" id="progress" value="100"></progress>
        <span className="text">분석을 완료하였습니다</span>
      </div>
    </div>
  );
}

export default Component3;
