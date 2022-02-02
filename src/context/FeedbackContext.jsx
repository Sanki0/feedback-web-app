import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import FeedbackData from '../data/FeedbackData';

const FeedbackContext = React.createContext()

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = React.useState(FeedbackData)

  const [feedbackEdit, setFeedbackEdit] = React.useState({
    item: {},
    edit: false
  })

  //Delete Feedback
  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure?')) {
      setFeedback(feedback.filter((item) => (
        item.id !== id
      )))
    }
  }

  //Add Feedback
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4()
    setFeedback([newFeedback, ...feedback])
  }

  //Edit Feedback
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true
    })
  }

  return (
    <FeedbackContext.Provider
      value={{ //pass to the value in order to pass through the global state
        feedback,
        deleteFeedback,
        addFeedback,
        editFeedback,
        feedbackEdit
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}
export default FeedbackContext