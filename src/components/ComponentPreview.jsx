import React from 'react';
import CodeViewer from './CodeViewer';

const ComponentPreview = ({ generatedComponent, generatedComponentCode, loading, error }) => {
  const showSplitView = !!generatedComponent && !!generatedComponentCode;
  return (
    <div className="componentPreviewSectionContainer">
      {error && <div className="error-msg">{error}</div>}
      <div className={`previewContent${showSplitView ? ' splitView' : ''}`}>
        {generatedComponent ? (
          <div className="componentDisplay">
            {generatedComponent}
          </div>
        ) : (
          <div className="emptyMessage">
            {loading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <span>Generating your component...</span>
              </div>
            ) : (
              <p className="emptyMessageHint">Describe your component in the input field and click Generate Component</p>
            )}
          </div>
        )}
        {showSplitView && (
          <CodeViewer code={generatedComponentCode} />
        )}
      </div>
    </div>
  );
};

export default ComponentPreview;