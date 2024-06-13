import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LanguageSelection.css'; // Import your CSS file for styling

const LanguageSelection = () => {
  const navigate = useNavigate(); // Use useNavigate hook for navigation

  const selectLanguage = (language) => {
    navigate(`/take-quiz/${language}`); // Use navigate function to navigate to the selected language
  };

  return (
    <div className="language-selection-container">
      <h2 className="language-heading">Select Programming Language</h2>
      <div className="button-container">
        <button className="language-button" onClick={() => selectLanguage('java')}>
          Java
        </button>
        <button className="language-button" onClick={() => selectLanguage('c')}>
          C
        </button>
        <button className="language-button" onClick={() => selectLanguage('c++')}>
          C++
        </button>
        <button className="language-button" onClick={() => selectLanguage('python')}>
          Python
        </button>
      </div>
    </div>
  );
};

export default LanguageSelection;
