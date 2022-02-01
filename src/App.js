import React from 'react';
import FeedbackList from './components/FeedbackList';
import Header from './components/Header';
import FeedbackData from './data/FeedbackData';

function App() {

  const [feedback, setFeedback] = React.useState(FeedbackData);

  return (
    <>
      <Header></Header>
      <div className='container'>
        <FeedbackList feedback={feedback} ></FeedbackList>
      </div>

    </>
  );
}

export default App;
