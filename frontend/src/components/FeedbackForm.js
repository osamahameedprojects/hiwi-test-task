import React, { useState, useRef } from 'react';
import { Form, Button, Alert, Toast, ToastContainer } from 'react-bootstrap';
import { submitFeedback } from '../services/api';

const FeedbackForm = ({ onFeedbackSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Toast state
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const toastRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setError('All fields are required');
      return;
    }
    
    try {
      setLoading(true);
      await submitFeedback(formData);
      
      // Show success toast
      setToastMessage('Feedback submitted successfully!');
      setShowToast(true);
      
      // Clear form
      setFormData({ name: '', email: '', message: '' });
      
      // Refresh feedback list
      if (onFeedbackSubmit) onFeedbackSubmit();
      
      // Auto-hide toast after 3 seconds
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-5">
      <h2 className="mb-4">Submit Feedback</h2>
      
      {error && <Alert variant="danger">{error}</Alert>}
      
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>Message</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Enter your feedback"
            required
          />
        </Form.Group>
        
        <Button 
          variant="primary" 
          type="submit"
          disabled={loading}
          className="mt-2"
        >
          {loading ? 'Submitting...' : 'Submit Feedback'}
        </Button>
      </Form>

      {/* Translucent Toast Container */}
      <ToastContainer 
        position="top-center" 
        className="p-3"
        style={{ 
          position: 'fixed', 
          top: '20px', 
          zIndex: 9999 
        }}
      >
        <Toast 
          show={showToast} 
          onClose={() => setShowToast(false)}
          delay={3000} 
          autohide
          ref={toastRef}
          style={{ 
            backgroundColor: 'rgba(40, 167, 69, 0.85)', // Translucent green
            backdropFilter: 'blur(5px)', // Frosted glass effect
            border: 'none',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }}
        >
          <Toast.Header 
            style={{ 
              backgroundColor: 'rgba(33, 136, 56, 0.8)', // Slightly darker translucent
              border: 'none',
              borderTopLeftRadius: '10px',
              borderTopRightRadius: '10px',
              color: 'white'
            }}
          >
            <strong className="me-auto">Success</strong>
          </Toast.Header>
          <Toast.Body 
            style={{ 
              color: 'white', 
              padding: '1rem',
              borderBottomLeftRadius: '10px',
              borderBottomRightRadius: '10px'
            }}
          >
            <div className="d-flex align-items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-check-circle me-2" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z"/>
              </svg>
              <span>{toastMessage}</span>
            </div>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default FeedbackForm;