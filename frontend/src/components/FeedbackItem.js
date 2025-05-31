import React from 'react';
import { Card } from 'react-bootstrap';

const FeedbackItem = ({ feedback }) => {
  // Format timestamp to readable format
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{feedback.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {feedback.email} • {formatDate(feedback.timestamp)}
        </Card.Subtitle>
        <Card.Text>{feedback.message}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default FeedbackItem;