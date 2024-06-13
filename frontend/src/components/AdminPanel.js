import React, { useState, useEffect } from 'react';
import { addQuestion, updateQuestion, deleteQuestion, getQuestions } from '../api';

const AdminPanel = () => {
  const [questions, setQuestions] = useState([]);
  const [questionData, setQuestionData] = useState({ language: '', questionText: '', options: ['', '', '', ''], correctOption: 0, explanation: '' });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      const { data } = await getQuestions('all'); // Assuming 'all' fetches all questions
      setQuestions(data);
    };
    fetchQuestions();
  }, []);

  const handleChange = (e) => {
    setQuestionData({ ...questionData, [e.target.name]: e.target.value });
  };

  const handleOptionChange = (e, index) => {
    const newOptions = questionData.options.map((option, i) => (i === index ? e.target.value : option));
    setQuestionData({ ...questionData, options: newOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await updateQuestion(editId, questionData);
    } else {
      await addQuestion(questionData);
    }
    const { data } = await getQuestions('all');
    setQuestions(data);
    setQuestionData({ language: '', questionText: '', options: ['', '', '', ''], correctOption: 0, explanation: '' });
    setEditId(null);
  };

  const handleEdit = (question) => {
    setQuestionData(question);
    setEditId(question._id);
  };

  const handleDelete = async (id) => {
    await deleteQuestion(id);
    const { data } = await getQuestions('all');
    setQuestions(data);
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="language" placeholder="Language" value={questionData.language} onChange={handleChange} />
        <input type="text" name="questionText" placeholder="Question Text" value={questionData.questionText} onChange={handleChange} />
        {questionData.options.map((option, index) => (
          <input key={index} type="text" placeholder={`Option ${index + 1}`} value={option} onChange={(e) => handleOptionChange(e, index)} />
        ))}
        <input type="number" name="correctOption" placeholder="Correct Option Index" value={questionData.correctOption} onChange={handleChange} />
        <input type="text" name="explanation" placeholder="Explanation" value={questionData.explanation} onChange={handleChange} />
        <button type="submit">{editId ? 'Update' : 'Add'} Question</button>
      </form>
      <ul>
        {questions.map((question) => (
          <li key={question._id}>
            <p>{question.questionText}</p>
            <button onClick={() => handleEdit(question)}>Edit</button>
            <button onClick={() => handleDelete(question._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;