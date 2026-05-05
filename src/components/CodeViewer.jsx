import React, { useState } from "react";
import "../styles/components/codeViewer.css";

const CodeViewer = ({ code }) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  return (
    <div className="codePanel">
      <div className="codePanelHeader">
        <span className="codePanelTitle">Generated Component Code</span>
        <div className="codePanelActions">
          <button className="iconBtn" onClick={handleCopy} title="Copy Code">
            <i className="fa-regular fa-clipboard"></i>
          </button>
        </div>
      </div>
      <div className="copyFeedbackRow">
        <span className={`copyFeedback${copySuccess ? ' visible' : ''}`}>Code Copied!</span>
      </div>
      <pre className="codeEditor">
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeViewer;
