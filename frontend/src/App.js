import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleFeedbackSubmit = () => {
    // Trigger refresh of feedback list
    setRefreshKey(prev => prev + 1);
  };

  return (
    <Container className="py-5">
      <h1 className="text-center mb-5">Feedback System</h1>
      
      <FeedbackForm onFeedbackSubmit={handleFeedbackSubmit} />
      <FeedbackList key={refreshKey} />
    </Container>
  );
}

export default App;