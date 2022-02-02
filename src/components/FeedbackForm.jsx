import React from 'react';
import FeedbackContext from '../context/FeedbackContext';
import RatingSelect from './RatingSelect';
import Button from './shared/Button';
import Card from './shared/Card';

function FeedbackForm() {

  const [text, setText] = React.useState('');
  const [rating, setRating] = React.useState(10)
  const [btnDisabled, setBtnDisabled] = React.useState(true)
  const [message, setMessage] = React.useState('')

  const { addFeedback, feedbackEdit } = React.useContext(FeedbackContext)

  React.useEffect(() => {
    if (feedbackEdit.edit === true) {
      setBtnDisabled(false)
      setText(feedbackEdit.item.text)
      setRating(feedbackEdit.item.rating)
    }
  }, [feedbackEdit])


  const handleTextChange = (e) => {
    if (text === '') {
      setBtnDisabled(true)
      setMessage(null)
    } else if (text !== '' && text.trim().length <= 10) {
      setMessage('Text must be at least 10 characters')
      setBtnDisabled(true)
    } else {
      setMessage(null)
      setBtnDisabled(false)
    }

    setText(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim().length > 10) {
      const newFeedBack = {
        text,
        rating,
      }
      console.log(newFeedBack)
      addFeedback(newFeedBack)

      setText('')
    }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>Rate our service</h2>
        <RatingSelect select={(rating) => { setRating(rating) }}></RatingSelect>
        <div className="input-group">
          <input onChange={handleTextChange} type="text" placeholder='write a review' value={text} />
          <Button type="submit" isDisabled={btnDisabled}>Send</Button>
        </div>
        {message && <div className='message'>{message} </div>}
      </form>
    </Card>
  )
}

export default FeedbackForm;
