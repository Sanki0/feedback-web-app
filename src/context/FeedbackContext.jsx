import React from 'react';

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
    const response = await fetch(`/feedback?_sort=id&_order=desc`)
    const data = await response.json()
    setFeedback(data)
    setIsLoading(false)
  }

  //Delete Feedback
  const deleteFeedback = async (id) => {
    if (window.confirm('Are you sure?')) {
      await fetch(`/feedback/${id}`, {
        method: 'DELETE'
      })
      setFeedback(feedback.filter((item) => (
        item.id !== id
      )))
    }
  }

  //Add Feedback
  const addFeedback = async (newFeedback) => {
    const response = await fetch(`/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFeedback)
    })

    const data = await response.json()

    setFeedback([data, ...feedback])
  }

  //Set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true
    })
  }

  //Update Feedback
  const updateFeedback = async (id, updItem) => {
    const response = await fetch(`/feedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updItem)
    })

    const data = await response.json()

    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...data } : item))
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