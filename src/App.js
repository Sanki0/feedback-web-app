import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';
import FeedbackStats from './components/FeedbackStats';
import Header from './components/Header';
import FeedbackData from './data/FeedbackData';
import AboutPage from './pages/AboutPage';
import AboutIconLink from './components/AboutIconLink';

function App() {

  const [feedback, setFeedback] = React.useState(FeedbackData);

  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure?')) {
      setFeedback(feedback.filter((item) => (
        item.id !== id
      )))
    }
  }
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4()
    setFeedback([newFeedback, ...feedback])
  }
  return (
    <BrowserRouter>
      <Header></Header>
      <div className='container'>
        <Routes>


          <Route exact path='/' element={
            <>
              <FeedbackForm handleAdd={addFeedback}></FeedbackForm>
              <FeedbackStats feedback={feedback}></FeedbackStats>
              <FeedbackList
                feedback={feedback}
                handleDelete={deleteFeedback}
              ></FeedbackList>
            </>
          }>

          </Route>

          <Route path='/about' element={<AboutPage />} />
        </Routes>
        <AboutIconLink />
      </div>

    </BrowserRouter>
  );
}

export default App;
