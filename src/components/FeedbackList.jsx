import React from 'react';
import FeedbackContext from '../context/FeedbackContext';
import FeedbackItem from './FeedbackItem';
import Spinner from './shared/Spinner';

function FeedbackList() {
  const { feedback, isLoading } = React.useContext(FeedbackContext)
  if (!isLoading && (!feedback || feedback.length === 0)) {
    return <p>No feedback</p>
  }

  return isLoading ? (
    <Spinner></Spinner>
  ) : (
    <div className='feedback-list'>
      {feedback.map((item) => (
        <FeedbackItem
          key={item.id}
          item={item}
        >
        </FeedbackItem>
      ))}
    </div>
  )
}



export default FeedbackList;
