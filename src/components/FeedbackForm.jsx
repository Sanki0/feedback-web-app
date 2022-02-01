import React from 'react';
import RatingSelect from './RatingSelect';
import Button from './shared/Button';
import Card from './shared/Card';

function FeedbackForm() {
  const [text, setText] = React.useState('');
  const [btnDisabled, setBtnDisabled] = React.useState(true)
  const [message, setMessage] = React.useState('')

  const handleTextChange = (e) => {
    if (text.trim().length === 0) {
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

  return (
    <Card>
      <form action="">
        <h2>Rate our service</h2>
        <RatingSelect select={(rating) => { console.log(rating) }}></RatingSelect>
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
