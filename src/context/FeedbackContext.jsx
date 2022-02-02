import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const FeedbackContext = React.createContext()

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = React.useState(true)
  const [feedback, setFeedback] = React.useState([])

  const [feedbackEdit, setFeedbackEdit] = React.useState({
    item: {},
    edit: false
  })

  React.useEffect(() => {
    fetchFeedback()
  }, [])

  //Fetch Feedback from db.json 
  const fetchFeedback = async () => {
    const response = await fetch(`http://localhost:5000/feedback?_sort=id&_order=desc`)
    const data = await response.json()
    setFeedback(data)
    setIsLoading(false)
  }

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

  //Set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true
    })
  }

  //Update Feedback
  const updateFeedback = (id, updItem) => {
    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...updItem } : item))
    )
  }

  return (
    <FeedbackContext.Provider
      value={{ //pass to the value in order to pass through the global state
        isLoading,
        feedback,
        feedbackEdit,
        deleteFeedback,
        addFeedback,
        editFeedback,
        updateFeedback
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}
export default FeedbackContext