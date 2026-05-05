import React from 'react';

const EXAMPLE_PROMPTS = [
  "Create a pricing card with title, price, and buy button.",
  "Create a responsive navbar with logo and 3 links.",
  "Create a user profile card with avatar and follow button.",
];

const InputSection = ({ value, loading, onChange, onGenerate, onExamplePromptSelect }) => {
  const isGenerateDisabled = !value.trim() || loading;

  return (
    <div className="inputSectionContainer">
      <div className="inputSectionHeader">
        <span className="inputSectionLabel">Component Prompt</span>
        <span className="promptCharCount">{value.length} chars</span>
      </div>

      <textarea 
        className='textAreaInput' 
        placeholder='Describe your React component' 
        value={value}
        onChange={onChange}
        disabled={loading}
      />

      <div className="examplePromptsContainer">
        <p className="examplePromptsTitle">Try an example:</p>
        <div className="examplePromptsList">
          {EXAMPLE_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              type="button"
              className="examplePromptChip"
              onClick={() => onExamplePromptSelect(prompt)}
              disabled={loading}
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      <button
        className='generateComponentBtn'
        onClick={onGenerate}
        disabled={isGenerateDisabled}
      >
        {loading ? 'Generating...' : 'Generate Component'}
      </button>
    </div>
  );
};

export default InputSection;