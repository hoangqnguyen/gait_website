import React, { useEffect } from "react";
// import "@/styles/Component2.css";

function Component2({ onTimeout }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            if (onTimeout) {
                onTimeout(); // Call the onTimeout function passed as a prop
            }
        }, 1000);

        // Cleanup the timer if the component is unmounted
        return () => clearTimeout(timer);
    }, [onTimeout]);

    return (
        <div className="div-wrapper">
            <div className="overlap-group2">
                <button className="overlap">
                    <a href="./"><div className="text-wrapper">취소하기</div></a>
                </button>
                <progress className="progress_bar" id="progress"></progress>
                <span className="text">영상을 분석중입니다</span>
            </div>
        </div>
    );
}

export default Component2;
