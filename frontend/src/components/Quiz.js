import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getQuestions } from '../api';
import './Quiz.css'; // Import your CSS file

const Quiz = () => {
  const { language } = useParams();
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answerFeedback, setAnswerFeedback] = useState(null); // State to store answer feedback
  const [selectedOption, setSelectedOption] = useState(null); // State to track selected option index

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const { data } = await getQuestions(language);
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    fetchQuestions();
  }, [language]);

  const handleAnswer = (index) => {
    const correctOption = questions[currentQuestion]?.correctOption;
    const isCorrect = index === correctOption;

    // Prepare feedback
    const feedback = {
      correct: isCorrect,
      explanation: questions[currentQuestion]?.explanation,
      selectedAnswer: questions[currentQuestion]?.options[index],
      correctAnswer: questions[currentQuestion]?.options[correctOption]
    };

    // Set answer feedback immediately
    setAnswerFeedback(feedback);

    // Calculate score
    if (isCorrect) {
      setScore(score + 1);
    }

    // Set selected option
    setSelectedOption(index);

    // Move to the next question or show result after a delay
    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowResult(true);
      }
    }, 2000); // Delay showing the next question or result for 2 seconds
  };

  if (questions.length === 0) {
    return <div className="quiz-loading">Loading...</div>; // Handle loading state while fetching questions
  }

  return (
    <div className="quiz-container">
      <div className="quiz-question">
        <h2>{questions[currentQuestion]?.questionText}</h2>
        <div className="quiz-options">
          {questions[currentQuestion]?.options.map((option, index) => (
            <button
              key={index}
              className={`quiz-option ${selectedOption === index ? 'selected' : ''}`}
              onClick={() => handleAnswer(index)}
            >
              {option}
            </button>
          ))}
        </div>
        {answerFeedback && (
          <div className="quiz-feedback">
            <p>{answerFeedback.correct ? 'Correct!' : 'Wrong!'}</p>
            <p>Explanation: {answerFeedback.explanation}</p>
          </div>
        )}
      </div>
      {showResult && (
        <div className="quiz-result">
          <h2>Your score: {score}</h2>
        </div>
      )}
    </div>
  );
};

export default Quiz;
