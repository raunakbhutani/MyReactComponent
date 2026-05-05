import React, { useCallback, useState } from 'react'
import './App.css'
import { generateContent, purifyCode } from './helper';
import InputSection from './components/InputSection';
import ComponentPreview from './components/ComponentPreview';

const App = () => {
  const [info, setInfo] = useState({
    userQuery: '',
    error: '',
    generatedComponent: null,
    generatedComponentCode: '',
    loading: false
  });

  const handleInputChange = useCallback((e) => {
    setInfo((prev) => ({ ...prev, userQuery: e.target.value, error: '' }));
  }, []);
  
  const handleGenerateInputReactComponent = useCallback(async () => {
    if (!info.userQuery.length) {
      return setInfo((prev) => ({
        ...prev, error: 'Please enter a valid query!'
      }));
    }
    setInfo((prev) => ({ 
      ...prev, 
      loading: true, 
      error: '', 
      generatedComponent: null,
      generatedComponentCode: ''
     }));

    try {
      const response = await generateContent(info.userQuery);
      let generatedComponentCodeRaw = response.candidates[0].content.parts[0].text;

      const purifiedCode = purifyCode(generatedComponentCodeRaw);
      let Component = new Function(
        'React',
        `try{
            ${purifiedCode}
            return GeneratedComponent
        }
        catch(error) {
          throw(error)
        }
        `
      )(React)

      setInfo((prev) => ({
        ...prev,
        generatedComponent: <Component />,
        generatedComponentCode: purifiedCode,
        error: "",
        userQuery: ''
      }));
    }
    catch (error) {
      console.log('error:', error);
      setInfo((prev) => ({
        ...prev,
        error: error.message || 'Something went wrong, please try again',
      }));
    }
    finally {
      setInfo((prev) => ({ ...prev, loading: false }));
    }
  }, [info.userQuery, info.loading])

  const handleExamplePromptSelect = useCallback((prompt) => {
    setInfo((prev) => ({ ...prev, userQuery: prompt }));
  }, []);

  return (
    <>
      <div className="codeGeneratorParentContainer">
        <InputSection 
          value={info.userQuery}
          onChange={handleInputChange}
          onGenerate={handleGenerateInputReactComponent}
          onExamplePromptSelect={handleExamplePromptSelect} // Pass the handler here
        />

        <ComponentPreview
          generatedComponent={info.generatedComponent}
          generatedComponentCode={info.generatedComponentCode}
          loading={info.loading}
          error={info.error}
        />
      </div>
    </>
  )
}

export default App
