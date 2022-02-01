import React from 'react';
import FeedbackList from './components/FeedbackList';
import FeedbackStats from './components/FeedbackStats';
import Header from './components/Header';
import FeedbackData from './data/FeedbackData';

function App() {

  const [feedback, setFeedback] = React.useState(FeedbackData);

  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure?')) {
      setFeedback(feedback.filter((item) => (
        item.id !== id
      )))
    }
  }
  return (
    <>
      <Header></Header>
      <div className='container'>
        <FeedbackStats feedback={feedback}></FeedbackStats>
        <FeedbackList
          feedback={feedback}
          handleDelete={deleteFeedback}
        ></FeedbackList>
      </div>

    </>
  );
}

export default App;
