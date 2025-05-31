import React, { useState, useEffect } from 'react';
import { Spinner, Alert, Button } from 'react-bootstrap'; // Added Button import
import { fetchFeedback } from '../services/api';
import FeedbackItem from './FeedbackItem';

const FeedbackList = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadFeedback = async () => {
      try {
        setLoading(true);
        const data = await fetchFeedback();
        setFeedbackList(data);
      } catch (err) {
        setError('Failed to load feedback');
      } finally {
        setLoading(false);
      }
    };
    
    loadFeedback();
  }, []);

  const refreshFeedback = async () => {
    try {
      setLoading(true);
      const data = await fetchFeedback();
      setFeedbackList(data);
    } catch (err) {
      setError('Failed to refresh feedback');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Latest Feedback</h2>
        <Button variant="outline-primary" size="sm" onClick={refreshFeedback}>
          Refresh
        </Button>
      </div>
      
      {loading && (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      
      {error && <Alert variant="danger">{error}</Alert>}
      
      {!loading && !error && feedbackList.length === 0 && (
        <Alert variant="info">No feedback submitted yet.</Alert>
      )}
      
      {feedbackList.map((feedback) => (
        <FeedbackItem key={feedback.id} feedback={feedback} />
      ))}
    </div>
  );
};

export default FeedbackList;