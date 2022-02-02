import React from 'react';
import FeedbackContext from '../context/FeedbackContext';
import FeedbackItem from './FeedbackItem';

function FeedbackList() {
  const { feedback } = React.useContext(FeedbackContext)
  if (!feedback || feedback.length === 0) {
    return <p>No feedback</p>
  }
  return (
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
